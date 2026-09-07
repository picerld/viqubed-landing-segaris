import * as React from "react"

import { cn } from "../../lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-border bg-white/[0.03] placeholder:text-muted-foreground/70 flex h-11 w-full min-w-0 rounded-lg border px-3.5 py-2 text-sm shadow-xs transition-[color,box-shadow,border-color] outline-none",
        "focus-visible:border-primary/60 focus-visible:ring-primary/30 focus-visible:ring-4",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
