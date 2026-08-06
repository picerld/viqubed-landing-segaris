import { PageHeader } from "@/components/PageHeader"
import { Reveal } from "@/components/Reveal"
import { CtaSection } from "@/components/CtaSection"
import { SolutionCard } from "@/components/SolutionCard"
import { solutions } from "@/data/solutions"

export function Solutions() {
  return (
    <>
      <PageHeader
        eyebrow="Industry Solutions"
        title="Tailored 3D Solutions Across Key Sectors"
        description="Ensure your organization's learning and explainer needs are matched with optimized 3D interactive models."
      />

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
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
  )
}
