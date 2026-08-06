import { useState } from "react"
import { Play } from "lucide-react"

import { topicImage } from "@/lib/images"
import { cn } from "@/lib/utils"

export function MediaPlaceholder({
  label,
  className,
  aspect = "aspect-video",
  imageKeywords,
}: {
  label: string
  className?: string
  aspect?: string
  imageKeywords?: string
}) {
  const [playing, setPlaying] = useState(false)
  const [errored, setErrored] = useState(false)

  const showImage = imageKeywords && !errored

  return (
    <button
      type="button"
      onClick={() => setPlaying((v) => !v)}
      className={cn(
        "group border-border/60 relative w-full overflow-hidden rounded-2xl border text-left",
        showImage ? "border-solid" : "bg-glow bg-card/40 border-dashed",
        aspect,
        className
      )}
    >
      {showImage && (
        <img
          src={topicImage(imageKeywords, { width: 1280, height: 720 })}
          alt=""
          loading="lazy"
          onError={() => setErrored(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div
        className={cn(
          "absolute inset-0",
          showImage
            ? "bg-black/45 transition-colors duration-300 group-hover:bg-black/35"
            : "bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06),transparent_60%)]"
        )}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
        <span
          className={cn(
            "bg-gradient-brand flex size-16 items-center justify-center rounded-2xl shadow-[0_8px_30px_-8px_var(--brand-primary)] transition-all duration-300 group-hover:scale-110",
            playing && "scale-90 animate-pulse"
          )}
        >
          <Play className="ml-1 size-6 fill-white text-white" />
        </span>
        <span
          className={cn(
            "text-center text-xs font-medium tracking-[0.14em] uppercase",
            showImage ? "text-white/90" : "text-muted-foreground"
          )}
        >
          {playing ? "Playing preview…" : label}
        </span>
      </div>
      <div className="via-primary/60 absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  )
}
