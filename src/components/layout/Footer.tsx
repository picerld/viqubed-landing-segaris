import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

import { Logo } from "../../components/layout/Logo";
import {
  LinkedinIcon,
  YoutubeIcon,
  InstagramIcon,
} from "../../components/icons/SocialIcons";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { VideoPopup } from "../../components/videoPopup";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "Features", to: "/features" },
      { label: "Solutions", to: "/solutions" },
      { label: "Pricing", to: "/pricing" },
      { label: "Products", to: "/" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Mission", to: "/" },
      { label: "Vision", to: "/" },
      { label: "Company", to: "/" },
      { label: "History", to: "/" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Customer Support", to: "/contact" },
      { label: "Delivery Details", to: "/contact" },
      { label: "Terms & Conditions", to: "/" },
      { label: "Privacy Policy", to: "/" },
    ],
  },
];

const socials = [
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: YoutubeIcon, href: "#https://www.youtube.com/watch?v=trXFHkaT2w4&t=571s", label: "YouTube" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");

    window.setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="border-border/60 border-t">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-5">
          {/* Logo + Social */}
          <div className="col-span-2 md:col-span-1">
            <Logo />

            <p className="text-muted-foreground mt-4 max-w-[220px] text-sm leading-relaxed">
              An online web platform for crafting 3D interactive content easily.
              Build, annotate, and publish anywhere.
            </p>

            <div className="mt-5 flex gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => {
                if (label === "YouTube") {
                  return (
                    <VideoPopup key={label} videoId="trXFHkaT2w4">
                      <button
                        type="button"
                        aria-label="YouTube"
                        className="border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10 flex size-9 items-center justify-center rounded-full border transition-colors"
                      >
                        <Icon className="size-4" />
                      </button>
                    </VideoPopup>
                  );
                }

                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10 flex size-9 items-center justify-center rounded-full border transition-colors"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-foreground text-sm font-semibold">
                {col.title}
              </h3>

              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-foreground text-sm font-semibold">
              Subscribe to newsletter
            </h3>

            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              We'll send you a friendly note once a week — no spam, just good
              vibes!
            </p>

            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <Input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10"
              />

              <Button type="submit" size="sm" className="shrink-0">
                {subscribed ? <Check className="size-4" /> : "Sign Up"}
              </Button>
            </form>

            {subscribed && (
              <p className="text-primary mt-2 text-xs">
                Thanks! You're on the list.
              </p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-border/60 text-muted-foreground mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} VIQUBED. All rights reserved.</p>

          <p className="flex items-center gap-1">
            Crafted for immersive learning
            <ArrowRight className="size-3.5" />
          </p>
        </div>
      </div>
    </footer>
  );
}
