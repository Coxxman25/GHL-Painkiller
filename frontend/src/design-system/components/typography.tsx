"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

interface AuroraTextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  variant?: 'gradient' | 'glow' | 'primary' | 'secondary' | 'accent'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  animate?: boolean
}

const AuroraText = React.forwardRef<HTMLElement, AuroraTextProps>(
  ({ className, children, variant = 'primary', as = 'p', animate = false, ...props }, ref) => {
    const variantClasses = {
      gradient: 'text-gradient-aurora font-semibold',
      glow: 'text-glow text-aurora-primary',
      primary: 'text-text-primary',
      secondary: 'text-text-secondary',
      accent: 'text-text-accent'
    }
    
    const Component = animate ? motion[as] : as
    const animationProps = animate ? {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, ease: "easeOut" }
    } : {}

    return (
      <Component
        ref={ref}
        className={cn(variantClasses[variant], className)}
        {...animationProps}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
AuroraText.displayName = "AuroraText"

interface AuroraHeadingProps extends AuroraTextProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  gradient?: boolean
}

const AuroraHeading = React.forwardRef<HTMLHeadingElement, AuroraHeadingProps>(
  ({ className, children, level, gradient = false, animate = false, ...props }, ref) => {
    const headingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    
    const sizeClasses = {
      1: 'text-4xl font-bold tracking-tight',
      2: 'text-3xl font-semibold tracking-tight',
      3: 'text-2xl font-semibold tracking-tight',
      4: 'text-xl font-semibold tracking-tight',
      5: 'text-lg font-semibold tracking-tight',
      6: 'text-base font-semibold tracking-tight'
    }
    
    return (
      <AuroraText
        ref={ref}
        as={headingTag}
        variant={gradient ? 'gradient' : 'primary'}
        animate={animate}
        className={cn(sizeClasses[level], className)}
        {...props}
      >
        {children}
      </AuroraText>
    )
  }
)
AuroraHeading.displayName = "AuroraHeading"

interface AuroraBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

const AuroraBadge = React.forwardRef<HTMLSpanElement, AuroraBadgeProps>(
  ({ className, children, variant = 'primary', size = 'md', glow = false, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-pill font-medium transition-all duration-200"
    
    const variantClasses = {
      primary: 'bg-aurora-primary/20 text-aurora-primary border border-aurora-primary/30',
      secondary: 'bg-aurora-secondary/20 text-aurora-secondary border border-aurora-secondary/30',
      success: 'bg-green-500/20 text-green-400 border border-green-500/30',
      warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      error: 'bg-red-500/20 text-red-400 border border-red-500/30'
    }
    
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base'
    }
    
    const glowClasses = glow ? 'aurora-glow' : ''
    
    return (
      <motion.span
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          glowClasses,
          className
        )}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        {...props}
      >
        {children}
      </motion.span>
    )
  }
)
AuroraBadge.displayName = "AuroraBadge"

interface AuroraCodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  inline?: boolean
  language?: string
}

const AuroraCode = React.forwardRef<HTMLElement, AuroraCodeProps>(
  ({ className, children, inline = true, language, ...props }, ref) => {
    const baseClasses = "font-mono bg-surface-glass border border-surface-glass-border"
    
    if (inline) {
      return (
        <code
          ref={ref as React.Ref<HTMLElement>}
          className={cn(
            baseClasses,
            "px-2 py-1 text-sm rounded-element",
            className
          )}
          {...props}
        >
          {children}
        </code>
      )
    }
    
    return (
      <pre
        ref={ref as React.Ref<HTMLPreElement>}
        className={cn(
          baseClasses,
          "p-4 rounded-container overflow-x-auto custom-scrollbar",
          className
        )}
        {...props}
      >
        <code className="text-sm">
          {children}
        </code>
      </pre>
    )
  }
)
AuroraCode.displayName = "AuroraCode"

export { AuroraText, AuroraHeading, AuroraBadge, AuroraCode }