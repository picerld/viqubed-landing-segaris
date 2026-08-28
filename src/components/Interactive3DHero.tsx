import { Suspense, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Bounds, Center, Html, OrbitControls, useGLTF } from "@react-three/drei"
import { Boxes, Move3d, Package } from "lucide-react"
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
 */

const EXPLODE_STRENGTH = 0.55 // multiplier on each part's original distance from center
const EXPLODE_BASE_RATIO = 0.08 // minimum nudge, as a fraction of the model's overall size
const SEPARATION_ITERATIONS = 16 // relaxation passes to resolve part-vs-part overlap
const SEPARATION_PADDING_RATIO = 0.03 // extra breathing room between parts, as a fraction of model size

type ExplodablePart = {
  object: THREE.Object3D
  origin: THREE.Vector3
  offset: THREE.Vector3
}

function ExplodableModel({ url, exploded }: { url: string; exploded: boolean }) {
  const { scene } = useGLTF(url)

  // Clone so we never mutate the cached GLTF scene (useGLTF caches by URL —
  // mutating the original would corrupt it for future mounts of this file).
  const model = useMemo(() => scene.clone(true), [scene])

  const parts = useMemo<ExplodablePart[]>(() => {
    model.updateMatrixWorld(true)

    const box = new THREE.Box3().setFromObject(model)
    const overallCenter = box.getCenter(new THREE.Vector3())
    const modelSize = box.getSize(new THREE.Vector3()).length() || 1
    const baseOffset = modelSize * EXPLODE_BASE_RATIO
    const padding = modelSize * SEPARATION_PADDING_RATIO

    const meshes: THREE.Mesh[] = []
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) meshes.push(child as THREE.Mesh)
    })

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
        origin: mesh.position.clone(),
        offset: localDisplacement,
      })
    })

    return list
  }, [model])

  const factorRef = useRef(0)

  // Smoothly animate every part toward its exploded or assembled position
  // each frame, rather than snapping instantly.
  useFrame((_, delta) => {
    const target = exploded ? 1 : 0
    factorRef.current = THREE.MathUtils.damp(factorRef.current, target, 5, delta)

    for (const part of parts) {
      part.object.position.copy(part.origin).addScaledVector(part.offset, factorRef.current)
    }
  })

  return <primitive object={model} />
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

  return (
    <Spotlight
      className={cn(
        "border-border/60 bg-glow bg-card/40 relative w-full overflow-hidden rounded-2xl border",
        "aspect-video select-none",
        className
      )}
    >
      <Canvas className="absolute inset-0" camera={{ position: [4, 3, 5], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 6, 5]} intensity={1.4} />
        <directionalLight position={[-5, -2, -4]} intensity={0.35} />
        <Suspense fallback={<CanvasLoader />}>
          <Bounds fit clip observe={false} margin={1.3}>
            <Center>
              <ExplodableModel url={modelUrl} exploded={exploded} />
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
      </Canvas>

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