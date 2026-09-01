import { useTopicImage } from "@/lib/useTopicImage";
import { Spotlight } from "@/components/Spotlight";
import { cn } from "@/lib/utils";

export function MediaPlaceholder({
  label,
  className,
  aspect = "aspect-video",
  imageKeywords,
  videoSrc,
}: {
  label: string;
  className?: string;
  aspect?: string;
  imageKeywords?: string;
  videoSrc?: string;
}) {
  const { src, loaded, failed, onLoad, onError } = useTopicImage(
    imageKeywords,
    {
      width: 1280,
      height: 720,
    },
  );

  const showImage = !!src;

  // Video langsung autoplay ketika videoSrc tersedia
  if (videoSrc) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-border/60",
          aspect,
          className,
        )}
      >
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          preload="auto"
        />
      </div>
    );
  }

  return (
    <Spotlight
      as="div"
      className={cn(
        "group border-border/60 relative w-full overflow-hidden rounded-2xl border text-left",
        showImage ? "border-solid" : "bg-glow bg-card/40 border-dashed",
        aspect,
        className,
      )}
    >
      {showImage && (
        <img
          src={src}
          alt={label}
          loading="lazy"
          onLoad={onLoad}
          onError={onError}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {showImage && !loaded && (
        <div
          className="bg-card/40 absolute inset-0 animate-pulse"
          aria-hidden
        />
      )}

      <div
        className={cn(
          "absolute inset-0",
          showImage
            ? "bg-black/45"
            : "bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06),transparent_60%)]",
        )}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
        <span
          className={cn(
            "bg-primary flex size-16 items-center justify-center rounded-2xl shadow-[0_8px_30px_-8px_var(--brand-primary)]",
          )}
        >
          <span className="size-3 rounded-full bg-white" />
        </span>

        <span
          className={cn(
            "text-center text-xs font-medium tracking-[0.14em] uppercase",
            showImage ? "text-white/90" : "text-muted-foreground",
          )}
        >
          {label}
        </span>

        {!showImage && failed && (
          <span className="text-muted-foreground/70 text-center text-[11px]">
            Preview unavailable
          </span>
        )}
      </div>

      <div className="via-primary/60 absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Spotlight>
  );
}
