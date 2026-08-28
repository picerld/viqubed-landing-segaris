import { useEffect, useState, type ReactNode } from "react";
import { ExternalLink, X } from "lucide-react";

type VideoPopupProps = {
  videoId: string;
  children: ReactNode;
};

export function VideoPopup({ videoId, children }: VideoPopupProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Tombol yang diklik */}
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>

      {/* Popup */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="size-5" />
            </button>

            {/* Video */}
            <div className="aspect-video w-full bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <p className="text-muted-foreground text-sm">
                Watch the full presentation on YouTube
              </p>

              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Watch on YouTube
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
