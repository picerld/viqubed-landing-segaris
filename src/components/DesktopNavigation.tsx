import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "../lib/utils";
import { megaMenus, navLinks } from "../data/navigation";

export function DesktopNavigation() {
  return (
    <ul className="hidden items-center justify-self-center gap-1 md:flex">
      {navLinks.map((link) => {
        const menu = link.megaMenu ? megaMenus[link.label] : null;

        if (link.megaMenu && menu) {
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

              <div
                className={cn(
                  "invisible absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100",
                  menu.length > 1 ? "w-[500px]" : "w-[200px]",
                )}
              >
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border border-border/60 bg-background/55 shadow-xl backdrop-blur-xl",
                    menu.length > 1 ? "p-6" : "p-4",
                  )}
                >
                  <div
                    className={cn(
                      "grid",
                      menu.length > 1
                        ? "grid-cols-2 gap-6"
                        : "grid-cols-1",
                    )}
                  >
                    {menu.map((section, index) => (
                      <div
                        key={section.title ?? `section-${index}`}
                      >
                        {section.title && (
                          <h3 className="mb-2 px-2 text-[14px] font-bold tracking-wider text-foreground">
                            {section.title}
                          </h3>
                        )}

                        <div className="flex flex-col gap-0.5">
                          {section.items.map((item) => (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              className="rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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