import {
  useRef,
  type ComponentPropsWithoutRef,
  type PointerEvent,
  type ReactNode,
} from "react"

import { cn } from "../lib/utils"

type SpotlightProps = {
  className?: string
  children?: ReactNode
  as?: React.ElementType
  to?: string
} & Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "children" | "as"
>

export function Spotlight({
  className,
  children,
  ...props
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return

    const rect = ref.current.getBoundingClientRect()

    ref.current.style.setProperty(
      "--spot-x",
      `${e.clientX - rect.left}px`,
    )

    ref.current.style.setProperty(
      "--spot-y",
      `${e.clientY - rect.top}px`,
    )
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn(
        "group/spot relative isolate",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="spotlight-glow pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
      />

      {children}
    </div>
  )
}
