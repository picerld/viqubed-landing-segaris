import { lazy, Suspense } from "react";

import { Reveal } from "@/components/Reveal";
import { CtaSection } from "@/components/CtaSection";
import { SolutionCard } from "@/components/SolutionCard";
import { solutions } from "@/data/solutions";
import { GlowOrbs } from "@/components/GlowOrbs";

// Model files only ever come from src/assets/models — no runtime upload.
// Place your .glb there and import it like this (the `?url` suffix tells
// Vite to give back a static asset URL instead of trying to parse it).
import wulingAirPinkModel from "@/assets/models/Wuling_Air_Pink.glb?url";

// Dynamic import — Vite splits this (and its three.js / @react-three/*
// dependencies) into its own chunk, fetched only when this component is
// about to render, instead of shipping on every page's main bundle.
const Interactive3DHero = lazy(() => import("@/components/Interactive3DHero"));

export function Solutions() {
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
              Market Solution — <br />{" "}
              <span className="text-gradient-brand">
                Immersive Web 3D Experience
              </span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-4xl text-balance">
              Powered by next-gen web 3D technology, viqubed studio delivers
              butterysmooth, interactive learning experiences directly to any
              browser. No downloads, no coding—just pure, hands-on exploration
              that helps your audience grasp complex knowledge faster and retain
              it longer
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <Suspense
              fallback={
                <div className="border-border/60 bg-card/40 aspect-video w-full animate-pulse rounded-2xl border" />
              }
            >
              <Interactive3DHero
                modelUrl={wulingAirPinkModel}
                label="360° INTERACTIVE 3D PRODUCT SOLUTION CANVAS — DRAG TO ROTATE"
              />
            </Suspense>
          </Reveal>
        </div>
      </section>

      {/* <PageHeader
        eyebrow="Industry Solutions"
        title="Tailored 3D Solutions Across Key Sectors"
        description="Ensure your organization's learning and explainer needs are matched with optimized 3D interactive models."
      /> */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => (
            <Reveal key={solution.slug} delay={(i % 3) * 0.08}>
              <SolutionCard solution={solution} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}