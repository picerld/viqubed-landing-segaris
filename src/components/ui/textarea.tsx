import * as React from "react"

import { cn } from "../../lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-border bg-white/[0.03] placeholder:text-muted-foreground/70 flex min-h-28 w-full rounded-lg border px-3.5 py-3 text-sm shadow-xs transition-[color,box-shadow,border-color] outline-none",
        "focus-visible:border-primary/60 focus-visible:ring-primary/30 focus-visible:ring-4",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
