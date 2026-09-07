import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Type,
  Volume2,
  Video,
  FileText,
  Box,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { MediaPlaceholder } from "../components/MediaPlaceholder";
import { Reveal } from "../components/Reveal";
import { CtaSection } from "../components/CtaSection";
import { SolutionCard } from "../components/SolutionCard";
import { GlowOrbs } from "../components/GlowOrbs";
import { solutions } from "../data/solutions";
import "animate.css";
import videoHome from "../assets/videos/viqubed.mp4";

const keyFeatures = [
  { icon: Type, label: "Text" },
  { icon: Volume2, label: "Audio" },
  { icon: Video, label: "Video" },
  { icon: FileText, label: "Docs" },
  { icon: Box, label: "3D" },
];

export function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <GlowOrbs />
        <div className="mx-auto max-w-5xl px-5 pt-16 pb-10 text-center sm:px-8 sm:pt-24">
          <Reveal>
            <h1 className="text-foreground mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Bring your 3D model to life vision —{" "}
              <span className="text-gradient-brand">
                Without Writing a Single Line of Code
              </span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-4xl text-balance">
              An online web-based platform for crafting 3D interactive content
              more easily, designed for deep learning experience — from
              classroom learning and training to product knowledge explainer,
              and share it via a single link.
            </p>
            <p className="text-foreground mx-auto mt-3 max-w-xl font-medium text-balance">
              Build and share your valuable knowledge to your team and to the
              world.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="dark"
                size="lg"
                className="cursor-pointer"
                asChild
              >
                <a href="#MediaPlaceholder">
                  <Play className="size-3.5 fill-current" />
                  Watch Presentation
                </a>
              </Button>
              <Button size="lg" asChild>
                <Link to="/contact">
                  Start Free Trial
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <p className="text-muted-foreground mx-auto mt-6 max-w-lg text-sm text-balance">
              Immersive 3D content composer built for creators, designers, and
              storytellers. Turn complex interactive ideas into stunning
              realities effortlessly.
            </p>
          </Reveal>
          <div id="MediaPlaceholder" className="mt-14">
            <Reveal delay={0.1} className="mt-14">
              <MediaPlaceholder
                label="Hero Image / Video Presentation"
                imageKeywords="technology,abstract"
                videoSrc={videoHome}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Key features */}
      <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8">
        <Reveal>
          <span className="text-brand-primary brightness-125 text-xs font-semibold tracking-[0.2em] uppercase">
            Key Features
          </span>
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Turning passive viewers into active explorers
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-balance">
            Enable learners to understand complex concept, from cellular
            biology, architectural, or mechanicals, are instantly demystified.
            Easily combining text, audio, video and 3D asset into one single 3D
            interactive content without touching any script or code. Teachers,
            Instructors and Designers focused the content, we handle the code.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {keyFeatures.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="border-border/60 bg-card/50 text-foreground flex items-center gap-3 rounded-xl border px-10 py-5 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-primary/10"
              >
                <Icon className="text-brand-primary brightness-125 size-5" />
                {label}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Industry solutions grid */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          {/* <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            Industry Solutions
          </span> */}
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Interactive learning &amp; training solution for many subjects,
            across any sector
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-balance">
            Ensure your learning needs are combined with the optimum solution.
          </p>
        </Reveal>


        <div className="mt-12 grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {solutions.map((solution, i) => (
            <Reveal key={solution.slug} delay={(i % 3) * 0.08}>
              <SolutionCard solution={solution} compact />
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-16">
        <CtaSection />
      </div>
    </>
  );
}
