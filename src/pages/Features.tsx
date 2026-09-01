import { Reveal } from "../components/Reveal";
import { CtaSection } from "../components/CtaSection";
import { Spotlight } from "../components/Spotlight";
import { useTopicImage } from "../lib/useTopicImage";
import { cn } from "../lib/utils";
import { GlowOrbs } from "../components/GlowOrbs";
import { MediaPlaceholder } from "../components/MediaPlaceholder";

const bentoFeatures = [
  {
    title: "No-Code, Visual Content Composition",
    description: null,
    imageKeywords: "citrus,fruit",
    gradient: "from-rose-400 via-orange-300 to-amber-200",
    height: "h-72",
  },
  {
    title: "Web-Based & Accessible (Zero Installation)",
    description: null,
    imageKeywords: "browser,internet",
    gradient: "from-stone-500 via-emerald-800 to-stone-400",
    height: "h-72",
  },
];

const bentoWide = {
  title: "Interactive Mechanics & Spatial Logic",
  description:
    "Plenty of tools to add interactivity, dissect objects, explode object, cut-away object, transparent & solidify, animation can easily be done. You can add explanatory text, document, photo's and images, or videos to support your content enrichment.",
  imageKeywords: "champagne,celebration",
  gradient: "from-sky-500 via-blue-600 to-rose-400",
};

const bentoNarrow = {
  title: "Cross-Sector Versatility (Multi-Subject, MultiIndustry/Institution)",
  imageKeywords: "red,geometric",
  gradient: "from-red-500 via-rose-400 to-stone-200",
};

const bentoBottom = [
  {
    title: "Seamless Sharing & Embedding",
    imageKeywords: "citrus,bowl",
    gradient: "from-teal-500 via-cyan-600 to-emerald-500",
  },
  {
    title: "Built-In Collaboration (For Teams & Classrooms)",
    imageKeywords: "cocktail,pink",
    gradient: "from-pink-300 via-rose-300 to-orange-200",
  },
];

function BentoTile({
  title,
  description,
  imageKeywords,
  gradient,
  className,
}: {
  title: string;
  description?: string | null;
  imageKeywords: string;
  gradient: string;
  className?: string;
}) {
  const { src, loaded, failed, onLoad, onError } = useTopicImage(
    imageKeywords,
    {
      width: 1000,
      height: 700,
    },
  );

  return (
    <Spotlight
      className={cn(
        "group border-border/60 relative flex flex-col justify-end overflow-hidden rounded-2xl border p-6",
        className,
      )}
    >
      {!failed ? (
        <>
          <img
            src={src}
            alt=""
            loading="lazy"
            onLoad={onLoad}
            onError={onError}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-110 transition-all",
              loaded ? "opacity-100" : "opacity-0",
            )}
          />
          {!loaded && (
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-60",
                gradient,
              )}
              aria-hidden
            />
          )}
        </>
      ) : (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-transform duration-500 ease-out group-hover:scale-110",
            gradient,
          )}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5" />
      <div className="relative">
        <h3 className="text-lg font-semibold text-white text-balance">
          {title}
        </h3>
        {description && (
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">
            {description}
          </p>
        )}
      </div>
    </Spotlight>
  );
}

export function Features() {
  return (
    <>
      <section className="relative">
        <GlowOrbs />
        <div className="mx-auto max-w-5xl px-5 pt-16 pb-10 text-center sm:px-8 sm:pt-24">
          <Reveal>
            {/* <Badge variant="subtle" className="mx-auto">
                  <Sparkles className="size-3.5" />
                  Market Solution
                </Badge> */}
            <h1 className="text-foreground mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Nothing to small to share <br />{" "}
              <span className="text-gradient-brand">knowledge</span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl">
              When you share even the smallest piece of what you know, you spark
              curiosity and empower someone else's learning journey.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="my-14">
            <MediaPlaceholder
              label="Image Placeholder"
              imageKeywords="technology,abstract"
              videoSrc="src/assets/videos/viqubed_presentation_egn.mp4"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {bentoFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <BentoTile {...f} className={f.height} />
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <BentoTile {...bentoWide} className="h-80" />
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-2">
            <BentoTile {...bentoNarrow} className="h-80" />
          </Reveal>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {bentoBottom.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <BentoTile {...f} className="h-72" />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
