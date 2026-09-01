import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";


import { DesktopNavigation } from "../DesktopNavigation";
import { MobileNavigation } from "../MobileNavigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";


export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto transition-[max-width,padding] duration-400 ease-out">
        <nav
          className={cn(
            "mx-auto grid grid-cols-[auto_1fr_auto] items-center transition-[height,border-radius,background-color,box-shadow,border-color,backdrop-filter] duration-400 ease-out md:grid-cols-[1fr_auto_1fr]",
            "h-20 px-4 sm:px-80",

            !isScrolled &&
              "border-transparent bg-transparent shadow-none backdrop-blur-0",

            isScrolled &&
              "border border-border/60 bg-background/55 shadow-xl backdrop-blur-[32px]",
          )}
        >
          <Logo />

          <DesktopNavigation />

          {/* Desktop Actions */}
          <div className="hidden items-center justify-self-end gap-3 md:flex">
            <ThemeToggle />

            <Button variant="dark" asChild>
              <Link to="/contact">Log In</Link>
            </Button>

            <Button asChild>
              <Link to="/contact">Explore Now</Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="col-start-3 flex items-center justify-self-end gap-2 md:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                open
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border/60 text-foreground",
              )}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.7,
                    }}
                  >
                    <X className="size-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.7,
                    }}
                  >
                    <Menu className="size-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        <MobileNavigation
          open={open}
          onClose={closeMenu}
        />
      </div>
    </header>
  );
}