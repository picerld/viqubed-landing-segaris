import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Send, CheckCircle2, Loader2 } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import {
  FacebookIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/icons/SocialIcons";
import { Reveal } from "@/components/Reveal";
import { CtaSection } from "@/components/CtaSection";
import { Spotlight } from "@/components/Spotlight";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faq";
import { GlowOrbs } from "@/components/GlowOrbs";

const contactInfo = [
  {
    icon: MapPin,
    label: "Office",
    value:
      "Jl. Terusan Gn. Batu Istana, Pasteur Regency CRB No. 62, Cicendo, Kota Bandung",
  },
  { icon: Mail, label: "Email", value: "info@segarismedia.co.id" },
  { icon: Phone, label: "Phone", value: "+6282246478080" },
];

const socials = [
  { icon: FacebookIcon, label: "Facebook" },
  { icon: LinkedinIcon, label: "LinkedIn" },
  { icon: YoutubeIcon, label: "YouTube" },
];

type Status = "idle" | "submitting" | "success";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nextErrors: Record<string, string> = {};

    if (!String(form.get("name") || "").trim())
      nextErrors.name = "Name is required";
    if (!String(form.get("email") || "").trim())
      nextErrors.email = "Email is required";
    if (!String(form.get("message") || "").trim())
      nextErrors.message = "Message is required";
    if (!agreed) nextErrors.agree = "Please agree to the privacy policy";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
      e.currentTarget.reset();
      setAgreed(false);
      window.setTimeout(() => setStatus("idle"), 4000);
    }, 900);
  };

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
              Feel free{" "}
              <span className="text-gradient-brand">to get in touch</span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl">
              An online web base platform for crafting 3D interactive content
              easily. Let's collaborate to identify the ideal strategies and
              learning frameworks tailored to your organization.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-20 sm:px-8 lg:grid-cols-2">
        {/* Info column */}
        <Reveal>
          <div className="flex h-full flex-col">
            <h2 className="text-foreground text-2xl font-semibold">
              Don't hesitate to contact us
            </h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              PT Segaris Media Teknologi provides tailored interactive 3D
              solutions for education, engineering, medical, and corporate
              training.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <Spotlight
                  key={label}
                  className="border-border/60 bg-card/40 flex items-start gap-4 rounded-xl border p-4 transition-colors hover:border-primary/40"
                >
                  <span className="bg-primary/15 text-primary relative flex size-10 shrink-0 items-center justify-center rounded-full">
                    <Icon className="size-4" />
                  </span>
                  <div className="relative">
                    <p className="text-foreground text-sm font-semibold">
                      {label}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-sm">
                      {value}
                    </p>
                  </div>
                </Spotlight>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-foreground text-sm font-medium">
                Social Media
              </p>
              <div className="mt-3 flex gap-2.5">
                {socials.map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10 flex size-9 items-center justify-center rounded-full border transition-colors"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Form column */}
        <Reveal delay={0.1}>
          <div className="border-border/60 bg-card/40 relative overflow-hidden rounded-2xl border p-6 sm:p-8">
            <h2 className="text-foreground text-xl font-semibold">
              Leave your message
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Send us a direct inquiry and our technical team will respond
              promptly.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Your Name" />
                  {errors.name && (
                    <p className="text-destructive text-xs">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="Subject" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Message" />
                {errors.message && (
                  <p className="text-destructive text-xs">{errors.message}</p>
                )}
              </div>

              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="agree"
                  checked={agreed}
                  onCheckedChange={(v) => setAgreed(v === true)}
                />
                <Label
                  htmlFor="agree"
                  className="text-muted-foreground font-normal"
                >
                  I agree to the privacy policy
                </Label>
              </div>
              {errors.agree && (
                <p className="text-destructive -mt-3 text-xs">{errors.agree}</p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="w-full sm:w-auto"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="size-4" />
                  </>
                )}
              </Button>
            </form>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-background/95 absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl text-center backdrop-blur-sm"
                >
                  <CheckCircle2 className="text-primary size-12" />
                  <p className="text-foreground text-lg font-semibold">
                    Message sent!
                  </p>
                  <p className="text-muted-foreground max-w-xs text-sm">
                    Thanks for reaching out — our team will get back to you
                    shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
        <Reveal>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="border-border/60 bg-card/40 rounded-2xl border px-6"
          >
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      <CtaSection />
    </>
  );
}
