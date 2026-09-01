import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/Reveal"

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
      <Reveal>
        <div className="bg-glow border-border/60 relative overflow-hidden rounded-3xl border px-6 py-16 text-center sm:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_65%)]" />
          <div className="relative">
            <h2 className="text-foreground mx-auto max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl">
              Discover more options about our ability features
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-4xl text-balance">
              Let's collaborate to identify the ideal strategies and learning
              frameworks tailored to your organization, empowering you to
              unlock maximum impact and performance.
            </p>
            {/* <p className="text-muted-foreground mx-auto mt-3 max-w-4xl text-balance">
              Create an active and stimulating learning environment by making
              it more engaging and rewarding.
            </p> */}
            <Button size="lg" className="mt-8" asChild>
              <Link to="/contact">
                Contact Us
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
