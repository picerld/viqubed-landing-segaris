import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: Readonly<{ className?: string }>) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "flex size-9 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-card/50 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-foreground",
        className,
      )}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 0.2,
        }}
      >
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </motion.div>
    </button>
  );
}
