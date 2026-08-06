import { Link } from "react-router-dom";
import { Check, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CtaSection } from "@/components/CtaSection";
import { Spotlight } from "@/components/Spotlight";
import { cn } from "@/lib/utils";
import { plans, compareGroups, compareColumns } from "@/data/pricing";
import { GlowOrbs } from "@/components/GlowOrbs";

export function Pricing() {
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
              Choose the Perfect Plan for <br />{" "}
              <span className="text-gradient-brand">
                Your 3D Creation Needs
              </span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl">
              Start for free or upgrade to access advanced 3D editing features,
              augmented reality, AI capabilities, and unlimited team
              collaboration.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Plan cards */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.06}>
              <Spotlight
                className={cn(
                  "border-border/60 bg-card/40 relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1",
                  plan.popular &&
                    "border-primary/70 shadow-[0_20px_60px_-25px_var(--brand-primary)] ring-1 ring-primary/40",
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-20 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}

                <h3 className="text-foreground text-sm font-bold tracking-wide">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {plan.tagline}
                </p>

                <div className="mt-6">
                  <span
                    className={cn(
                      "text-foreground font-bold",
                      plan.enterprise
                        ? "text-2xl text-gradient-brand"
                        : "text-3xl",
                    )}
                  >
                    {plan.price}
                  </span>
                  {plan.priceSuffix && (
                    <span className="text-muted-foreground text-sm">
                      {plan.priceSuffix}
                    </span>
                  )}
                  {plan.priceNote && (
                    <p className="text-muted-foreground mt-1 text-xs">
                      {plan.priceNote}
                    </p>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-foreground/90 flex items-start gap-2.5 text-sm"
                    >
                      <Check className="text-primary mt-0.5 size-4 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="mt-8"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link to="/contact">{plan.cta}</Link>
                </Button>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Compare Plan Specifications
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-balance">
            Detailed breakdown of capabilities, tools, and technical limits for
            each plan.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 overflow-x-auto">
          <div className="border-border/60 min-w-[720px] overflow-hidden rounded-2xl border">
            <div className="bg-card/60 grid grid-cols-5 border-b border-border/60 px-6 py-4 text-xs font-semibold tracking-wide">
              <span className="text-muted-foreground">Feature Overview</span>
              {compareColumns.map((col, i) => (
                <span
                  key={col}
                  className={cn(
                    "text-center",
                    i === 2 ? "text-primary" : "text-foreground",
                  )}
                >
                  {col}
                </span>
              ))}
            </div>

            {compareGroups.map((group) => (
              <div key={group.title}>
                <div className="bg-primary/[0.06] text-primary px-6 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase">
                  {group.title}
                </div>
                {group.rows.map((row) => (
                  <div
                    key={row.label}
                    className="border-border/40 grid grid-cols-5 items-center border-b px-6 py-4 text-sm last:border-b-0"
                  >
                    <span className="text-foreground/90 font-medium">
                      {row.label}
                    </span>
                    {row.values.map((value, i) => (
                      <span
                        key={i}
                        className={cn(
                          "flex justify-center text-center",
                          i === 2 && "bg-primary/[0.05]",
                        )}
                      >
                        {value === true ? (
                          <Check className="text-primary size-4" />
                        ) : value === "—" ? (
                          <Minus className="text-muted-foreground/50 size-4" />
                        ) : (
                          <span
                            className={cn(
                              "text-xs",
                              i === 2
                                ? "text-primary font-medium"
                                : "text-muted-foreground",
                            )}
                          >
                            {value}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <CtaSection />
    </>
  );
}
