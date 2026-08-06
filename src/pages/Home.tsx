import { Link } from "react-router-dom"
import { ArrowRight, Sparkles, Type, Volume2, Video, FileText, Box } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MediaPlaceholder } from "@/components/MediaPlaceholder"
import { Reveal } from "@/components/Reveal"
import { CtaSection } from "@/components/CtaSection"
import { SolutionCard } from "@/components/SolutionCard"
import { GlowOrbs } from "@/components/GlowOrbs"
import { solutions } from "@/data/solutions"

const keyFeatures = [
  { icon: Type, label: "Text" },
  { icon: Volume2, label: "Audio" },
  { icon: Video, label: "Video" },
  { icon: FileText, label: "Docs" },
  { icon: Box, label: "3D" },
]

export function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <GlowOrbs />
        <div className="mx-auto max-w-5xl px-5 pt-16 pb-10 text-center sm:px-8 sm:pt-24">
          <Reveal>
            <Badge variant="subtle" className="mx-auto">
              <Sparkles className="size-3.5" />
              No-Code Interactive 3D Platform
            </Badge>
            <h1 className="text-foreground mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Bring your 3D models to life vision —{" "}
              <span className="text-gradient-brand">without code.</span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-balance">
              An online web-based platform for crafting interactive 3D content
              easily. Designed for deep learning experiences — from classroom
              training to product knowledge explainers.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button variant="outline" size="lg">
                Watch Presentation
              </Button>
              <Button size="lg" asChild>
                <Link to="/contact">
                  Start Free Trial
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <MediaPlaceholder
              label="Hero Image / Video Presentation"
              imageKeywords="technology,abstract"
            />
          </Reveal>
        </div>
      </section>

      {/* Key features */}
      <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8">
        <Reveal>
          <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            Key Features
          </span>
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Turning passive viewers into active explorers
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-balance">
            Enable learners to understand complex concepts — from cellular
            biology to architectural or mechanical systems. Easily combine
            text, audio, video, and 3D assets without code.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {keyFeatures.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="border-border/60 bg-card/50 text-foreground flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-primary/10"
              >
                <Icon className="text-primary size-4" />
                {label}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Industry solutions grid */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            Industry Solutions
          </span>
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Interactive Solutions Across Any Sector
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-balance">
            Ensure your organization's learning and explainer needs are
            matched with optimized 3D interactive models.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => (
            <Reveal key={solution.slug} delay={(i % 3) * 0.08}>
              <SolutionCard solution={solution} compact />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Studio interface */}
      <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8">
        <Reveal>
          <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            Studio Interface
          </span>
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Build, Share, and Inspire Together
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-balance">
            Empower your students, team, or community with immersive 3D
            content that transforms abstract ideas into tangible reality.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <MediaPlaceholder
            label="Studio Editor UI Showcase"
            imageKeywords="dashboard,software"
          />
        </Reveal>
      </section>

      <CtaSection />
    </>
  )
}
