import { useState } from "react"

import { PageHeader } from "@/components/PageHeader"
import { Reveal } from "@/components/Reveal"
import { CtaSection } from "@/components/CtaSection"
import { topicImage } from "@/lib/images"
import { cn } from "@/lib/utils"

const bentoFeatures = [
  {
    title: "No-Code, Visual Content Composition",
    description: null,
    imageKeywords: "laptop,programming",
    gradient: "from-rose-400 via-orange-300 to-amber-200",
    height: "h-72",
  },
  {
    title: "Web-Based & Accessible (Zero Installation)",
    description: null,
    imageKeywords: "web,internet",
    gradient: "from-stone-500 via-emerald-800 to-stone-400",
    height: "h-72",
  },
]

const bentoWide = {
  title: "Interactive Mechanics & Spatial Logic",
  description:
    "Plenty of tools to add interactivity, dissect objects, explode object, cut-away object, transparent & solidify, animation can easily be done. You can add explanatory text, document, photo's and images, or videos to support your content enrichment.",
  imageKeywords: "gears,machine",
  gradient: "from-sky-500 via-blue-600 to-rose-400",
}

const bentoNarrow = {
  title: "Cross-Sector Versatility (Multi-Subject, MultiIndustry/Institution)",
  imageKeywords: "factory,robotics",
  gradient: "from-red-500 via-rose-400 to-stone-200",
}

const bentoBottom = [
  {
    title: "Seamless Sharing & Embedding",
    imageKeywords: "network,collaboration",
    gradient: "from-teal-500 via-cyan-600 to-emerald-500",
  },
  {
    title: "Built-In Collaboration (For Teams & Classrooms)",
    imageKeywords: "team,collaboration",
    gradient: "from-pink-300 via-rose-300 to-orange-200",
  },
]

function BentoTile({
  title,
  description,
  imageKeywords,
  gradient,
  className,
}: {
  title: string
  description?: string | null
  imageKeywords: string
  gradient: string
  className?: string
}) {
  const [errored, setErrored] = useState(false)

  return (
    <div
      className={cn(
        "group border-border/60 relative flex flex-col justify-end overflow-hidden rounded-2xl border p-6",
        className
      )}
    >
      {!errored ? (
        <img
          src={topicImage(imageKeywords, { width: 1000, height: 700 })}
          alt=""
          loading="lazy"
          onError={() => setErrored(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-transform duration-500 ease-out group-hover:scale-110",
            gradient
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
    </div>
  )
}

export function Features() {
  return (
    <>
      <PageHeader
        title={
          <>
            Nothing to small to share{" "}
            <span className="text-gradient-brand">knowledge</span>
          </>
        }
        description="When you share even the smallest piece of what you know, you spark curiosity and empower someone else's learning journey."
      />

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
  )
}
