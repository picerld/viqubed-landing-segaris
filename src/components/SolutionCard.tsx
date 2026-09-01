import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import type { Solution } from "@/data/solutions";
import { useTopicImage } from "@/lib/useTopicImage";
import { Spotlight } from "@/components/Spotlight";
import { cn } from "@/lib/utils";

export function SolutionCard({
  solution,
  compact = false,
}: {
  solution: Solution;
  compact?: boolean;
}) {
  // const { src, loaded, failed, onLoad, onError } = useTopicImage(solution.imageKeywords, {
  //   width: 640,
  //   height: 420,
  // })

  return (
    <Spotlight
      as={Link}
      to={`/solutions/${solution.slug}`}
      className="group border-border/60 bg-card/40 flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_50px_-25px_var(--brand-primary)]"
    >
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br",
          solution.gradient,
          compact ? "h-56" : "h-50",
        )}
      >
        {solution.imgurl && (
          <img
            src={solution.imgurl}
            alt=""
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-105 transition-all opacity-100",
            )}
          />
        )}
      </div>
      <div className="relative flex flex-1 flex-col p-5">
        <h3 className="text-foreground text-base font-semibold">
          {solution.title}
        </h3>
        <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
          {solution.shortDescription}
        </p>
        <span className="text-brand-primary brightness-125 my-6 inline-flex items-center gap-1.5 text-sm font-medium ">
          View Demo
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Spotlight>
  );
}
