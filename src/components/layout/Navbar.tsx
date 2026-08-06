import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/layout/Logo"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Product", to: "/" },
  { label: "Solutions", to: "/solutions" },
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={cn(
          "mx-auto transition-[max-width,padding] duration-400 ease-out",
          scrolled ? "max-w-4xl px-3 pt-3 sm:px-4" : "max-w-7xl px-5 pt-0 sm:px-8"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex items-center justify-between transition-[height,border-radius,background-color,box-shadow,border-color,backdrop-filter] duration-400 ease-out",
            scrolled
              ? "h-14 rounded-full border border-border/60 bg-background/80 px-4 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:px-5"
              : "h-16 rounded-full border border-transparent bg-transparent px-0"
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="bg-gradient-brand absolute inset-x-3 -bottom-px h-0.5 rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="outline" size="sm" asChild>
              <Link to="/contact">Log In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/contact">Sign Up</Link>
            </Button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="text-foreground inline-flex size-10 items-center justify-center rounded-full border border-border/60 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
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
                  <Button variant="outline" size="sm" className="flex-1" asChild>
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
