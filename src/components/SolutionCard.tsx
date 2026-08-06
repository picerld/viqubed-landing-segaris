import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

import type { Solution } from "@/data/solutions"
import { topicImage } from "@/lib/images"
import { cn } from "@/lib/utils"

export function SolutionCard({
  solution,
  compact = false,
}: {
  solution: Solution
  compact?: boolean
}) {
  const [errored, setErrored] = useState(false)

  return (
    <Link
      to={`/solutions/${solution.slug}`}
      className="group border-border/60 bg-card/40 relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_50px_-25px_var(--brand-primary)]"
    >
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br",
          solution.gradient,
          compact ? "h-28" : "h-36"
        )}
      >
        {!errored && (
          <img
            src={topicImage(solution.imageKeywords, { width: 640, height: 420 })}
            alt=""
            loading="lazy"
            onError={() => setErrored(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/15" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-foreground text-base font-semibold">
          {solution.title}
        </h3>
        <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
          {solution.shortDescription}
        </p>
        <span className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
          Learn More
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
