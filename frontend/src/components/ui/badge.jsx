import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 micro-button transition-all duration-200 hover:shadow-md",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 glow-primary",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 glass-card",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 glow-accent",
        outline: "text-foreground glass-card border-white/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }