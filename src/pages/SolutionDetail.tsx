import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { MediaPlaceholder } from "../components/MediaPlaceholder";
import { Reveal } from "../components/Reveal";
import { CtaSection } from "../components/CtaSection";
import { getSolutionBySlug } from "../data/solutions";

export function SolutionDetail() {
  const { slug } = useParams();
  const solution = getSolutionBySlug(slug);

  if (!solution) return <Navigate to="/solutions" replace />;

  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pt-10 pb-6 sm:px-8 mt-20">
        <Link
          to="/solutions"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="size-4" />
          All solutions
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
        <Reveal>
          <MediaPlaceholder
            label="Hero Image / Video Presentation"
            imageKeywords={solution.imgurl}
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            {solution.eyebrow}
          </span>
          <h1 className="text-foreground mt-3 max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            {solution.overviewTitle}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-balance leading-relaxed">
            Welcome! This interactive 3D{" "}
            {solution.title.replace(" Solution", "")} simulation is designed to
            provide hands-on virtual experience, dissecting complex components
            and systems without the need for heavy physical equipment.
          </p>

          <div className="border-border/60 mt-10 border-t pt-10">
            <h2 className="text-foreground text-2xl font-semibold">Overview</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
              {solution.overview}
            </p>
          </div>
        </Reveal>
      </section>

      <CtaSection />
    </>
  );
}
