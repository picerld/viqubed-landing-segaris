import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { Reveal } from "@/components/Reveal";
import { CtaSection } from "@/components/CtaSection";
import { GlowOrbs } from "@/components/GlowOrbs";


export function Product() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <GlowOrbs />
        <div className="mx-auto max-w-5xl px-5 pt-16 pb-10 text-center sm:px-8 sm:pt-24">
          <Reveal>
            {/* <Badge variant="subtle" className="mx-auto">
              <Sparkles className="size-3.5" />
              No-Code Interactive 3D Platform
            </Badge> */}
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
            {/* <p className="text-foreground mx-auto mt-3 max-w-xl font-medium text-balance">
              Build and share your valuable knowledge to your team and to the
              world.
            </p> */}
            {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button variant="dark" size="lg" className="cursor-pointer">
                <Play className="size-3.5 fill-current" />
                Watch Presentation
              </Button>
              <Button size="lg" asChild>
                <Link to="/contact">
                  Start Free Trial
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div> */}
            {/* <p className="text-muted-foreground mx-auto mt-6 max-w-lg text-sm text-balance">
              Immersive 3D content composer built for creators, designers, and
              storytellers. Turn complex interactive ideas into stunning
              realities effortlessly.
            </p> */}
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <MediaPlaceholder
              label="Hero Image / Video Presentation"
              imageKeywords="technology,abstract"
              videoSrc="/videos/viqubed_presentation.mp4"
            />
          </Reveal>
        </div>
      </section>

      {/* Studio interface */}
      <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8">
        <Reveal>
          {/* <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
            Studio Interface
          </span> */}
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Build, Share, and Inspire Together
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-4xl text-balance">
            Empower your students, team, or community with immersive 3D content
            that transforms abstract ideas into tangible reality. Shape the
            future of learning and collaboration, one interactive experience at
            a time.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <MediaPlaceholder
            label="Studio Editor UI Showcase"
            imageKeywords="software,computer"
          />
        </Reveal>
      </section>

      {/* Gamified learning */}
      <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8">
        <Reveal>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Turn Studying into an Adventure
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-balance">
            Experience studying like never before through gamified, interactive
            3D environments that make complex subjects genuinely enjoyable and
            fun.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <MediaPlaceholder
            label="Gamified Learning Showcase"
            imageKeywords="classroom,technology"
          />
        </Reveal>
      </section>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-16">
        <CtaSection />
      </div>
    </>
  );
}

export default Product;
