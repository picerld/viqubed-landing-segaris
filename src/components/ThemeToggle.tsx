import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/lib/theme"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: Readonly<{ className?: string }>) {
  const { theme, toggle } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className={cn(
        "cursor-pointer border-border/60 bg-card/50 relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border px-1 transition-colors hover:border-primary/50",
        className
      )}
    >
      <motion.span
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="bg-primary absolute top-1 left-1 z-10 flex size-7 items-center justify-center rounded-full text-white shadow-[0_2px_10px_-2px_var(--brand-primary)]"
      >
        {isDark ? (
          <Moon className="size-3.5 fill-current" />
        ) : (
          <Sun className="size-3.5" />
        )}
      </motion.span>
      <Sun className="text-muted-foreground/70 absolute top-1/2 left-1.5 size-3.5 -translate-y-1/2" />
      <Moon className="text-muted-foreground/70 absolute top-1/2 right-1.5 size-3.5 -translate-y-1/2" />
    </button>
  )
}
