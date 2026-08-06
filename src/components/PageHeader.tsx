import type { ReactNode } from "react"

import { Reveal } from "@/components/Reveal"
import { GlowOrbs } from "@/components/GlowOrbs"
import { cn } from "@/lib/utils"

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  className?: string
}) {
  return (
    <div className="relative">
      <GlowOrbs />
      <div className={cn("mx-auto max-w-3xl px-5 pt-16 pb-14 text-center sm:pt-24", className)}>
        <Reveal>
          {eyebrow && (
            <span className="text-primary mb-4 inline-block text-xs font-semibold tracking-[0.2em] uppercase">
              {eyebrow}
            </span>
          )}
          <h1 className="text-foreground text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-balance">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </div>
  )
}
