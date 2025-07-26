import * as React from "react"
import { AnimatedBorder } from "./animated-border"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, variant = 'default', animatedBorder = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow glass-card border-white/20 micro-card", className)}
    {...props}
  >
    {animatedBorder && (
      <AnimatedBorder 
        variant={variant} 
        speed={0.2} 
        opacity={0.2}
        className="absolute inset-0 rounded-xl pointer-events-none"
      />
    )}
    {props.children}
  </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 micro-hover", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const gradientClass = variant !== 'default' ? `gradient-text-${variant}` : 'gradient-text';
  
  return (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", gradientClass, className)}
      {...props} />
  );
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
