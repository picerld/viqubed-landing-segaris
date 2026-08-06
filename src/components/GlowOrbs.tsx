import { cn } from "@/lib/utils"

/**
 * Ambient bloom lighting behind hero content — soft, smoothly blended
 * color wash (pure gradient falloff, no hard edges). Height is fixed
 * rather than tied to the parent box, so the gradient always has room
 * to fade fully to transparent before it gets clipped — otherwise short
 * containers (page headers) cut the glow off mid-fade and leave a hard
 * edge against the plain background below.
 */
export function GlowOrbs({ className }: Readonly<{ className?: string }>) {
  return (
    <div
      aria-hidden
      className={cn(
        "bg-hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] sm:h-[40rem]",
        className
      )}
    />
  )
}
