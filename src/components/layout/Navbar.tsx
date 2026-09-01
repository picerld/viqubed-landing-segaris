import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Product", to: "/product", megaMenu: true },
  { label: "Features", to: "/features", },
  { label: "Solutions", to: "/solutions" },
  { label: "Support", to: "/support" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact", megaMenu: true },
];

const productMenu = [
  {
    title: "PLATFORM",
    items: [
      { label: "Dashboard", to: "/product/dashboard" },
      { label: "Map Analytics", to: "/product/map-analytics" },
      { label: "Layer Manager", to: "/product/layer-manager" },
      { label: "Reports", to: "/product/reports" },
      { label: "Activity Logs", to: "/product/activity-logs" },
    ],
  },
  {
    title: "DATA",
    items: [
      { label: "GIS Data", to: "/product/gis-data" },
      { label: "GeoServer", to: "/product/geoserver" },
      { label: "GeoJSON", to: "/product/geojson" },
      { label: "Shapefile", to: "/product/shapefile" },
      { label: "Raster Data", to: "/product/raster" },
    ],
  },
  {
    title: "TOOLS",
    items: [
      { label: "Map Tools", to: "/product/map-tools" },
      { label: "Analytics", to: "/product/analytics" },
      { label: "Monitoring", to: "/product/monitoring" },
      { label: "Data Management", to: "/product/data-management" },
      { label: "Export", to: "/product/export" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { label: "Drone Operations", to: "/product/drone-operations" },
      { label: "Mission Planning", to: "/product/mission-planning" },
      { label: "Flight Monitoring", to: "/product/flight-monitoring" },
      { label: "Inspection", to: "/product/inspection" },
      { label: "Surveying", to: "/product/surveying" },
    ],
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

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
            "h-20 border border-border/60 bg-background/80 px-4 backdrop-blur-xl sm:px-50",
          )}
        >
          <Logo />

          {/* Desktop Navigation */}
          <ul className="hidden items-center justify-self-center gap-1 md:flex">
            {navLinks.map((link) => {
              if (link.megaMenu) {
                return (
                  <li key={link.to} className="group relative">
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-1 rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "font-bold text-brand-primary brightness-125"
                            : "text-muted-foreground hover:text-foreground",
                        )
                      }
                    >
                      {link.label}
                      <ChevronDown className="size-4 transition-transform duration-200 group-hover:rotate-180" />
                    </NavLink>

                    {/* Mega Menu */}
                    <div className="invisible absolute left-1/2 top-full z-50 w-[760px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/95 p-6 shadow-xl backdrop-blur-xl">
                        <div className="grid grid-cols-4 gap-6">
                          {productMenu.map((section) => (
                            <div key={section.title}>
                              <h3 className="mb-3 px-2 text-[11px] font-bold tracking-wider text-foreground">
                                {section.title}
                              </h3>

                              <div className="flex flex-col gap-0.5">
                                {section.items.map((item) => (
                                  <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className="rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                  >
                                    {item.label}
                                  </NavLink>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "font-bold text-brand-primary brightness-125"
                          : "text-muted-foreground hover:text-foreground",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden items-center justify-self-end gap-3 md:flex">
            <ThemeToggle />

            {/* <Button variant="dark" size="sm" asChild>
              <Link to="/contact">Log In</Link>
            </Button> */}

            <Button asChild>
              <Link to="/contact">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="col-start-3 flex items-center justify-self-end gap-2 md:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/60 text-foreground"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="mt-2 overflow-hidden rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                {/* Product Mobile */}
                <div>
                  <NavLink
                    to="/product"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium",
                        isActive
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground",
                      )
                    }
                  >
                    Product
                    <ChevronDown className="size-4" />
                  </NavLink>

                  <div className="mt-1 grid grid-cols-2 gap-4 rounded-lg bg-muted/30 p-3">
                    {productMenu.map((section) => (
                      <div key={section.title}>
                        <h3 className="mb-2 px-2 text-[10px] font-bold tracking-wider text-foreground">
                          {section.title}
                        </h3>

                        <div className="flex flex-col">
                          {section.items.map((item) => (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              onClick={() => setOpen(false)}
                              className="rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                            >
                              {item.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Navigation */}
                {navLinks
                  .filter((link) => !link.megaMenu)
                  .map((link) => (
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
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}

                {/* Mobile Actions */}
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
  );
}
