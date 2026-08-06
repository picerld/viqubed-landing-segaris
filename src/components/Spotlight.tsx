import { useRef, type ComponentPropsWithoutRef, type ElementType, type PointerEvent, type ReactNode } from "react"

import { cn } from "@/lib/utils"

type SpotlightProps<T extends ElementType> = {
  as?: T
  className?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">

/**
 * Wraps any element with a brand-colored radial glow that tracks the
 * cursor — the "gloom" ambient-light look used across hero/CTA sections,
 * applied as a hover-reactive accent on individual cards. Mouse-only
 * (touch taps would otherwise leave the glow stuck at the last tap point).
 */
export function Spotlight<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: SpotlightProps<T>) {
  const Comp = (as ?? "div") as ElementType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)

  const handlePointerMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
    ref.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
  }

  return (
    <Comp
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn("group/spot relative isolate", className)}
      {...props}
    >
      <span
        aria-hidden
        className="spotlight-glow pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
      />
      {children}
    </Comp>
  )
}
