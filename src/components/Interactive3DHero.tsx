import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber"
import { Bounds, Center, Html, OrbitControls, useGLTF } from "@react-three/drei"
import { EffectComposer, Outline } from "@react-three/postprocessing"
import { Boxes, Move3d, Package, RotateCw, X } from "lucide-react"
import * as THREE from "three"

import { Spotlight } from "@/components/Spotlight"
import { cn } from "@/lib/utils"

/**
 * Draggable 3D hero that renders a .glb model (via three.js /
 * react-three-fiber).
 *
 * The model is NOT user-uploadable at runtime — `modelUrl` must point to a
 * file placed in `src/assets/models/` and imported at build time, e.g.:
 *
 *   import m4RifleModel from "@/assets/models/m4-rifle.glb?url"
 *   <Interactive3DHero modelUrl={m4RifleModel} />
 *
 * Features:
 * - Drag-to-rotate + scroll-to-zoom via OrbitControls; auto-rotates when idle.
 * - Auto-fits the camera to the model via <Bounds>.
 * - "Explode View" toggle: every mesh animates outward along the vector
 *   from the model's center to that mesh's own center, scaled down so far
 *   parts don't fly off disproportionately, and converted into each mesh's
 *   local space so parent rotation/scale in the model's hierarchy doesn't
 *   distort or exaggerate the movement.
 * - Click any part to select/highlight it (its name is shown in the
 *   overlay); click empty space to deselect.
 * - A pulsing "hotspot" marker sits on the handwheel part. Clicking it
 *   spins the wheel (all of its sub-meshes rotate together around a shared
 *   pivot); clicking it again spins it back to the original position.
 */

const EXPLODE_STRENGTH = 0.55 // multiplier on each part's original distance from center
const EXPLODE_BASE_RATIO = 0.08 // minimum nudge, as a fraction of the model's overall size
const SEPARATION_ITERATIONS = 16 // relaxation passes to resolve part-vs-part overlap
const SEPARATION_PADDING_RATIO = 0.03 // extra breathing room between parts, as a fraction of model size
// "Globe_Body" is special-cased: instead of the usual single-color select
// highlight, repeated clicks on it step through this color sequence
// (looping back to the start after the last color). No other part gets a
// highlight color at all when clicked.
const GLOBE_BODY_PART_NAME = "Globe_Body"
const GLOBE_BODY_CYCLE_COLORS = [
  new THREE.Color("#2563eb"), // blue
  new THREE.Color("#16a34a"), // green
  new THREE.Color("#ec4899"), // pink
]

// The handwheel hotspot: clicking it spins whichever mesh(es) are named
// (or nested under a parent named) this, around their shared vertical
// (local Y) pivot. ⚠️ Adjust this to match your model's real part name —
// use the same DevTools-console technique used to confirm "Globe_Body"
// earlier if you're not sure what it's called.
const HANDWHEEL_PART_NAME = "Handwheel"
const HANDWHEEL_SPIN_TURNS = 2.5 // how many full rotations when activated

// .glb exporters (Blender in particular) often put the meaningful name on
// a parent Group/Object3D rather than on the Mesh itself, and sometimes
// append a suffix like ".001" when there's a name collision in the source
// file. Walking up the ancestor chain and doing a case-insensitive,
// prefix-tolerant match makes the Globe_Body special-case actually match
// regardless of exactly where in the hierarchy that name lives.
function isNamed(object: THREE.Object3D, targetName: string): boolean {
  const normalizedTarget = targetName.toLowerCase()
  let node: THREE.Object3D | null = object
  while (node) {
    const name = node.name.toLowerCase()
    if (name === normalizedTarget || name.startsWith(normalizedTarget)) return true
    node = node.parent
  }
  return false
}

type ExplodablePart = {
  object: THREE.Mesh
  name: string
  isGlobeBody: boolean
  origin: THREE.Vector3
  offset: THREE.Vector3
}

type SelectedPart = { uuid: string; name: string }

function ExplodableModel({
  url,
  exploded,
  selectedUuid,
  onSelectPart,
  onHoverPart,
}: {
  url: string
  exploded: boolean
  selectedUuid: string | null
  onSelectPart: (part: SelectedPart | null) => void
  onHoverPart: (mesh: THREE.Mesh | null) => void
}) {
  const { scene } = useGLTF(url)

  // Clone so we never mutate the cached GLTF scene (useGLTF caches by URL —
  // mutating the original would corrupt it for future mounts of this file).
  const model = useMemo(() => scene.clone(true), [scene])

  const modelData = useMemo(() => {
    model.updateMatrixWorld(true)

    const box = new THREE.Box3().setFromObject(model)
    const overallCenter = box.getCenter(new THREE.Vector3())
    const modelSize = box.getSize(new THREE.Vector3()).length() || 1
    const baseOffset = modelSize * EXPLODE_BASE_RATIO
    const padding = modelSize * SEPARATION_PADDING_RATIO

    const meshes: THREE.Mesh[] = []
    let partIndex = 0

    model.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return
      const mesh = child as THREE.Mesh

      // Give every mesh a click-friendly display name, and make sure its
      // material is unique to this mesh (not shared with sibling parts) so
      // highlighting one part on selection never affects any other part
      // that happened to reuse the same material in the source file.
      if (!mesh.name) mesh.name = `Part ${partIndex + 1}`
      partIndex += 1

      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((mat) => mat.clone())
      } else {
        mesh.material = mesh.material.clone()
      }

      meshes.push(mesh)
    })

    // Group every handwheel sub-mesh under one shared pivot Group so they
    // spin together as a single rigid unit instead of each rotating around
    // its own individual origin (which would look broken if the wheel is
    // made of several separate meshes — rim, spokes, hub, etc.). `attach()`
    // reparents while preserving each mesh's current world position,
    // rotation, and scale, so nothing visually jumps when this happens.
    let wheelGroup: THREE.Group | null = null
    let wheelPivot: THREE.Vector3 | null = null
    const wheelMeshes = meshes.filter((mesh) => isNamed(mesh, HANDWHEEL_PART_NAME))

    if (wheelMeshes.length > 0) {
      const wheelBox = new THREE.Box3()
      wheelMeshes.forEach((mesh) => wheelBox.expandByObject(mesh))
      wheelPivot = wheelBox.getCenter(new THREE.Vector3())

      wheelGroup = new THREE.Group()
      wheelGroup.name = "__handwheelSpinPivot"
      wheelGroup.position.copy(wheelPivot)
      model.add(wheelGroup)

      wheelMeshes.forEach((mesh) => wheelGroup!.attach(mesh))
    }

    // Phase 1: an initial radial "explode target" per part — its own
    // bounding-sphere radius is included in the distance so a part is
    // pushed out at least far enough to clear its own size, not just its
    // center point.
    const originalCenters: THREE.Vector3[] = []
    const radii: number[] = []
    const targets: THREE.Vector3[] = []

    meshes.forEach((mesh) => {
      const sphere = new THREE.Box3().setFromObject(mesh).getBoundingSphere(new THREE.Sphere())
      originalCenters.push(sphere.center.clone())
      radii.push(sphere.radius)

      const toPart = sphere.center.clone().sub(overallCenter)
      const distance = toPart.length()

      // Parts sitting exactly on the model's center have no natural
      // direction to explode toward — nudge them upward instead of
      // leaving them stuck in place.
      const direction = distance < 1e-6 ? new THREE.Vector3(0, 1, 0) : toPart.normalize()
      const magnitude = baseOffset + distance * EXPLODE_STRENGTH + sphere.radius

      targets.push(sphere.center.clone().add(direction.multiplyScalar(magnitude)))
    })

    // Phase 2: relax any pair of exploded targets whose bounding spheres
    // (plus a little padding) still overlap, pushing them apart along the
    // line between their centers. A few passes are enough for this to
    // converge on a layout with no colliding parts, however tightly the
    // original model was packed.
    for (let iter = 0; iter < SEPARATION_ITERATIONS; iter++) {
      let movedAny = false

      for (let i = 0; i < targets.length; i++) {
        for (let j = i + 1; j < targets.length; j++) {
          const minDist = radii[i] + radii[j] + padding
          const delta = targets[j].clone().sub(targets[i])
          const dist = delta.length()

          if (dist > 1e-6 && dist < minDist) {
            const push = delta.normalize().multiplyScalar((minDist - dist) / 2)
            targets[i].sub(push)
            targets[j].add(push)
            movedAny = true
          } else if (dist <= 1e-6) {
            // Centers coincide exactly — nudge apart along an arbitrary
            // axis to break the tie so the pair can separate next pass.
            targets[i].add(new THREE.Vector3(0, -minDist / 2, 0))
            targets[j].add(new THREE.Vector3(0, minDist / 2, 0))
            movedAny = true
          }
        }
      }

      if (!movedAny) break
    }

    const list: ExplodablePart[] = []

    meshes.forEach((mesh, i) => {
      const worldDisplacement = targets[i].clone().sub(originalCenters[i])

      // mesh.position lives in the PARENT's local space, but the
      // displacement above was computed in world space. If the mesh's
      // parent has any rotation or non-uniform scale (common in .glb
      // hierarchies exported from 3D software), adding a raw world-space
      // vector straight onto a local position gets rotated/scaled along
      // with it — parts fly wildly further (or in the wrong direction)
      // than intended. Convert the displacement into the parent's local
      // space first so the *actual* distance traveled in the scene
      // matches what we calculated above.
      let localDisplacement = worldDisplacement
      const parent = mesh.parent
      if (parent) {
        const parentPos = new THREE.Vector3()
        const parentQuat = new THREE.Quaternion()
        const parentScale = new THREE.Vector3()
        parent.matrixWorld.decompose(parentPos, parentQuat, parentScale)

        localDisplacement = worldDisplacement
          .clone()
          .applyQuaternion(parentQuat.invert())
          .divide(
            new THREE.Vector3(
              parentScale.x || 1,
              parentScale.y || 1,
              parentScale.z || 1
            )
          )
      }

      list.push({
        object: mesh,
        name: mesh.name,
        isGlobeBody: isNamed(mesh, GLOBE_BODY_PART_NAME),
        origin: mesh.position.clone(),
        offset: localDisplacement,
      })
    })

    return { parts: list, wheelGroup, wheelPivot }
  }, [model])

  const { parts, wheelGroup, wheelPivot } = modelData

  const factorRef = useRef(0)
  const [wheelSpinning, setWheelSpinning] = useState(false)
  const wheelSpinFactorRef = useRef(0)

  // Smoothly animate every part toward its exploded or assembled position,
  // and the handwheel toward its spun or un-spun rotation, each frame
  // rather than snapping instantly.
  useFrame((_, delta) => {
    const target = exploded ? 1 : 0
    factorRef.current = THREE.MathUtils.damp(factorRef.current, target, 5, delta)

    for (const part of parts) {
      part.object.position.copy(part.origin).addScaledVector(part.offset, factorRef.current)
    }

    if (wheelGroup) {
      const spinTarget = wheelSpinning ? 1 : 0
      wheelSpinFactorRef.current = THREE.MathUtils.damp(wheelSpinFactorRef.current, spinTarget, 3, delta)
      wheelGroup.rotation.y = wheelSpinFactorRef.current * Math.PI * 2 * HANDWHEEL_SPIN_TURNS
    }
  })

  const [globeBodyClickCount, setGlobeBodyClickCount] = useState(0)

  // Apply / clear the highlight. Materials with an `emissive` channel
  // (MeshStandardMaterial, MeshPhysicalMaterial — what glTF exports to by
  // default) get a glow. As a fallback for material types without one
  // (e.g. MeshBasicMaterial), swap the base `color` directly instead so a
  // highlight is visible either way. Pass `color: null` to clear.
  const setHighlight = (mesh: THREE.Mesh, color: THREE.Color | null) => {
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    for (const mat of materials) {
      if ("emissive" in mat) {
        const standardMat = mat as THREE.MeshStandardMaterial
        standardMat.emissive = color ?? new THREE.Color("#000000")
        standardMat.emissiveIntensity = color ? 0.6 : 0
        continue
      }

      const basicMat = mat as THREE.MeshBasicMaterial
      if ("color" in basicMat) {
        if (color) {
          if (!basicMat.userData.__originalColor) {
            basicMat.userData.__originalColor = basicMat.color.clone()
          }
          basicMat.color = color.clone()
        } else if (basicMat.userData.__originalColor) {
          basicMat.color = (basicMat.userData.__originalColor as THREE.Color).clone()
        }
      }
    }
  }

  useEffect(() => {
    // Globe_Body may be a group containing several sub-meshes (a body
    // shell, bolts, flanges, etc.), not a single mesh. Highlighting only
    // the exact mesh that was raycast-hit could end up glowing some tiny
    // or hidden sub-part while the large visible surface stays untouched —
    // so instead we light up every mesh under the Globe_Body ancestor
    // together as one unit, whenever any of them is the selected part.
    const isGlobeBodySelected =
      selectedUuid !== null && parts.find((p) => p.object.uuid === selectedUuid)?.isGlobeBody === true

    const color = isGlobeBodySelected
      ? GLOBE_BODY_CYCLE_COLORS[globeBodyClickCount % GLOBE_BODY_CYCLE_COLORS.length]
      : null

    for (const part of parts) {
      if (part.isGlobeBody) setHighlight(part.object, color)
    }
  }, [selectedUuid, parts, globeBodyClickCount])

  return (
    <>
      <primitive
        object={model}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation()
          const mesh = event.object as THREE.Mesh
          if (!mesh.isMesh) return

          const part = parts.find((p) => p.object === mesh)

          if (part?.isGlobeBody) {
            // Stays selected across repeated clicks; each click just steps
            // the highlight to the next color in the cycle.
            setGlobeBodyClickCount((c) => c + 1)
            onSelectPart({ uuid: mesh.uuid, name: GLOBE_BODY_PART_NAME })
            return
          }

          onSelectPart(
            selectedUuid === mesh.uuid ? null : { uuid: mesh.uuid, name: mesh.name }
          )
        }}
        onPointerOver={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation()
          document.body.style.cursor = "pointer"
          const mesh = event.object as THREE.Mesh
          if (mesh.isMesh) onHoverPart(mesh)
        }}
        onPointerOut={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation()
          document.body.style.cursor = "auto"
          onHoverPart(null)
        }}
      />

      {/* Pulsing hotspot marker glued to the handwheel's pivot. Click to
          spin the wheel; click again to spin it back to rest. */}
      {wheelPivot && (
        <Html position={[wheelPivot.x, wheelPivot.y, wheelPivot.z]} center distanceFactor={8} occlude={false}>
          <button
            type="button"
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation()
              setWheelSpinning((v) => !v)
            }}
            aria-pressed={wheelSpinning}
            aria-label={wheelSpinning ? "Spin handwheel back" : "Spin handwheel"}
            className="group relative flex size-8 items-center justify-center"
          >
            <span
              className={cn(
                "bg-primary/60 absolute inset-0 rounded-full",
                !wheelSpinning && "animate-ping"
              )}
            />
            <span className="bg-primary ring-primary/30 relative flex size-8 items-center justify-center rounded-full text-white shadow-lg ring-4 transition-transform group-hover:scale-110">
              <RotateCw className="size-4" />
            </span>
          </button>
        </Html>
      )}
    </>
  )
}

function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="border-primary/30 border-t-primary size-8 animate-spin rounded-full border-2" />
        <span className="text-xs font-medium text-white/80">Loading model…</span>
      </div>
    </Html>
  )
}

export function Interactive3DHero({
  /** Must be a URL to a file in `src/assets/models/`, imported at build time. */
  modelUrl,
  label = "360° INTERACTIVE 3D PRODUCT SOLUTION CANVAS",
  className,
}: {
  modelUrl: string
  label?: string
  className?: string
}) {
  const [exploded, setExploded] = useState(false)
  const [selectedPart, setSelectedPart] = useState<SelectedPart | null>(null)
  const [hoveredMesh, setHoveredMesh] = useState<THREE.Mesh | null>(null)

  return (
    <Spotlight
      className={cn(
        "border-border/60 bg-glow relative w-full overflow-hidden rounded-2xl border",
        "bg-gradient-to-br from-slate-800/70 via-slate-900/60 to-slate-800/70",
        "aspect-video select-none",
        className
      )}
    >
      <Canvas
        className="absolute inset-0"
        camera={{ position: [4, 3, 5], fov: 40 }}
        dpr={[1, 2]}
        onPointerMissed={() => setSelectedPart(null)}
      >
        {/* Brighter, more even lighting: a strong ambient + hemisphere fill
            so no side of the model reads as near-black, a bright key light,
            a brighter fill on the opposite side, and a soft light from
            near the camera so whatever's facing the viewer isn't left dark. */}
        <ambientLight intensity={1.1} />
        <hemisphereLight args={["#e2e8f0", "#1e293b", 0.6]} />
        <directionalLight position={[5, 6, 5]} intensity={2.2} />
        <directionalLight position={[-5, -2, -4]} intensity={0.9} />
        <directionalLight position={[0, 2, 6]} intensity={0.7} />
        <Suspense fallback={<CanvasLoader />}>
          <Bounds fit clip observe={false} margin={1.3}>
            <Center>
              <ExplodableModel
                url={modelUrl}
                exploded={exploded}
                selectedUuid={selectedPart?.uuid ?? null}
                onSelectPart={setSelectedPart}
                onHoverPart={setHoveredMesh}
              />
            </Center>
          </Bounds>
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.1}
          minDistance={0.5}
          maxDistance={50}
        />
        {/* White outline around whichever part is currently under the
            pointer. Kept mounted permanently (with an empty selection when
            nothing is hovered) rather than mounted/unmounted per-hover, so
            there's no effect-pipeline setup cost on every mouse move. */}
        <EffectComposer autoClear={false}>
          <Outline
            selection={hoveredMesh ? [hoveredMesh] : []}
            visibleEdgeColor={0xffffff}
            hiddenEdgeColor={0xffffff}
            edgeStrength={6}
            blur
            width={1000}
          />
        </EffectComposer>
      </Canvas>

      {/* Top-left overlay: selected part name */}
      {selectedPart && (
        <div className="pointer-events-none absolute top-4 left-4">
          <div className="bg-primary/90 pointer-events-auto flex items-center gap-2 rounded-full py-1.5 pr-1.5 pl-3 text-xs font-medium text-white shadow-lg backdrop-blur">
            {selectedPart.name}
            <button
              type="button"
              onClick={() => setSelectedPart(null)}
              className="hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              aria-label="Clear selection"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom overlay: label + explode toggle */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/60 via-black/10 to-transparent p-6">
        <div className="flex items-center gap-2">
          <Move3d className="text-primary size-4" />
          <span className="text-center text-xs font-medium tracking-[0.14em] text-white/90 uppercase">
            {label}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setExploded((v) => !v)}
          aria-pressed={exploded}
          className={cn(
            "pointer-events-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur transition-colors",
            exploded
              ? "bg-primary text-primary-foreground border-primary"
              : "text-muted-foreground hover:text-foreground bg-card/60 border-border/60"
          )}
        >
          {exploded ? <Package className="size-3.5" /> : <Boxes className="size-3.5" />}
          {exploded ? "Assemble" : "Explode View"}
        </button>
      </div>
    </Spotlight>
  )
}

// React.lazy() needs a default export to resolve the dynamic import() —
// keep the named export too so non-lazy call sites still work.
export default Interactive3DHero