import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import { cn } from "../lib/utils";
import { megaMenus, navLinks } from "../data/navigation";

export function DesktopNavigation() {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <ul className="hidden items-center justify-center gap-1 md:flex">
      {navLinks.map((link) => {
        const menu = link.megaMenu ? megaMenus[link.label] : null;

        {/* ==================== MEGA MENU ==================== */}
        if (link.megaMenu && menu) {
          const isSectionActive =
            location.pathname === link.to ||
            location.pathname.startsWith(`${link.to}/`);

          const isOpen = openMenu === link.label;

          return (
            <li
              key={link.to}
              className="group relative"
              onMouseEnter={() => setOpenMenu(link.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {/* Navigation Trigger */}
              <button
                type="button"
                onClick={() => setOpenMenu(isOpen ? null : link.label)}
                className={cn(
                  "flex items-center gap-1 rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                  isSectionActive
                    ? "font-bold text-brand-primary brightness-125"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}

                <ChevronDown
                  className={cn(
                    "size-4 transition-transform duration-200",
                    isOpen && "rotate-180",
                    isSectionActive && "text-brand-primary",
                  )}
                />
              </button>

              {/* Dropdown */}
              <div
                className={cn(
                  "absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 pt-3 transition-all duration-200",
                  menu.length > 1 ? "w-[500px]" : "w-[200px]",
                  isOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0",
                )}
              >
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border border-border/60 bg-background shadow-xl",
                    menu.length > 1 ? "p-6" : "p-4",
                  )}
                >
                  {/* View halaman utama */}
                  <NavLink
                    to={link.to}
                    end
                    onClick={() => setOpenMenu(null)}
                    className={({ isActive }) =>
                      cn(
                        "mb-4 block border-b border-border/60 px-3 pb-4 text-sm font-medium transition-colors",
                        isActive
                          ? "text-brand-primary"
                          : "text-foreground hover:text-brand-primary",
                      )
                    }
                  >
                    View {link.label}
                  </NavLink>

                  {/* Menu */}
                  <div
                    className={cn(
                      "grid",
                      menu.length > 1
                        ? "grid-cols-2 gap-x-6 gap-y-5"
                        : "grid-cols-1",
                    )}
                  >
                    {menu.map((section, index) => (
                      <div key={section.title ?? `section-${index}`}>
                        {section.title && (
                          <h3 className="mb-2 px-2 text-[13px] font-bold tracking-wide text-foreground">
                            {section.title}
                          </h3>
                        )}

                        <div className="flex flex-col gap-0.5">
                          {section.items.map((item) => (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              onClick={() => setOpenMenu(null)}
                              className={({ isActive }) =>
                                cn(
                                  "rounded-lg px-3 py-2 text-sm transition-colors",
                                  isActive
                                    ? "bg-primary/10 font-medium text-brand-primary"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                                )
                              }
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
  );
}