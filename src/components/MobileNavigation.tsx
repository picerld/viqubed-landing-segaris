import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { megaMenus, navLinks } from "../data/navigation";

export function MobileNavigation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu((current) => (current === label ? null : label));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mt-2 overflow-hidden rounded-2xl border border-border/60 bg-background/95 shadow-xl backdrop-blur-xl md:hidden"
        >
          <div className="p-2">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const menu = link.megaMenu ? megaMenus[link.label] : null;

                if (!link.megaMenu || !menu) {
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === "/"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          "flex h-11 items-center rounded-xl px-3 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  );
                }

                const isOpen = openMenu === link.label;

                return (
                  <div key={link.to}>
                    <div
                      className={cn(
                        "flex h-11 items-center rounded-xl transition-colors",
                        isOpen && "bg-accent/60",
                      )}
                    >
                      <NavLink
                        to={link.to}
                        onClick={onClose}
                        className={({ isActive }) =>
                          cn(
                            "flex h-full flex-1 items-center px-3 text-sm font-medium",
                            isActive
                              ? "text-brand-primary brightness-125"
                              : "text-foreground",
                          )
                        }
                      >
                        {link.label}
                      </NavLink>

                      <button
                        type="button"
                        onClick={() => toggleMenu(link.label)}
                        className="flex h-full w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={`Toggle ${link.label} submenu`}
                        aria-expanded={isOpen}
                      >
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-200",
                            isOpen && "rotate-180 text-primary",
                          )}
                        />
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.2,
                            ease: "easeOut",
                          }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 mt-1 border-l border-border/60 pb-1 pl-3">
                            {menu.map((section, index) => (
                              <div
                                key={section.title ?? `section-${index}`}
                                className="mb-2 last:mb-0"
                              >
                                {section.title && (
                                  <p className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                    {section.title}
                                  </p>
                                )}

                                <div className="flex flex-col">
                                  {section.items.map((item) => (
                                    <NavLink
                                      key={item.to}
                                      to={item.to}
                                      onClick={onClose}
                                      className="flex min-h-9 items-center rounded-lg px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                    >
                                      {item.label}
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 border-t border-border/60 pt-3">
              <div className="flex gap-2">
                <Button
                  variant="dark"
                  size="sm"
                  className="h-10 flex-1 rounded-xl"
                  asChild
                >
                  <Link to="/contact" onClick={onClose}>
                    Log In
                  </Link>
                </Button>

                <Button size="sm" className="h-10 flex-1 rounded-xl" asChild>
                  <Link to="/contact" onClick={onClose}>
                    Explore Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
