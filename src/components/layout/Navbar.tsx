import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/layout/Logo"
import { ThemeToggle } from "@/components/ThemeToggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Product", to: "/product" },
  { label: "Features", to: "/features" },
  { label: "Solutions", to: "/solutions" },
  { label: "Support", to: "/support" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={cn(
          "mx-auto transition-[max-width,padding] duration-400 ease-out",
          // scrolled ? "max-w-4xl px-3 pt-3 sm:px-4" : "max-w-7xl px-5 pt-0 sm:px-8"
        )}
      >
        <nav
          className={cn(
            "mx-auto grid grid-cols-[auto_1fr_auto] items-center transition-[height,border-radius,background-color,box-shadow,border-color,backdrop-filter] duration-400 ease-out md:grid-cols-[1fr_auto_1fr]",
            "h-14 rounded-full border border-border/60 bg-background/80 px-4 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:px-5"
          )}
        >
          <Logo />

          <ul className="hidden items-center justify-self-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-primary font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center justify-self-end gap-3 md:flex">
            <ThemeToggle />
            <Button variant="dark" size="sm" asChild>
              <Link to="/contact">Log In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/contact">Sign Up</Link>
            </Button>
          </div>

          <div className="col-start-3 flex items-center justify-self-end gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="text-foreground inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/60"
              aria-label="Toggle menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="border-border/60 bg-background/95 mt-2 overflow-hidden rounded-2xl border backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "rounded-lg px-3 py-2.5 text-sm font-medium",
                        isActive
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="mt-3 flex gap-3">
                  <Button variant="dark" size="sm" className="flex-1" asChild>
                    <Link to="/contact" onClick={() => setOpen(false)}>
                      Log In
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <Link to="/contact" onClick={() => setOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
