"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'interactive'
  glow?: boolean
  animate?: boolean
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, children, variant = 'default', glow = false, animate = false, ...props }, ref) => {
    const baseClasses = "glass-panel"
    
    const variantClasses = {
      default: "",
      elevated: "shadow-elevated",
      interactive: "glass-panel-hover interactive-scale cursor-pointer"
    }
    
    const glowClasses = glow ? "aurora-glow" : ""
    
    const Component = animate ? motion.div : "div"
    const animationProps = animate ? {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, ease: "easeOut" }
    } : {}

    return (
      <Component
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          glowClasses,
          className
        )}
        {...animationProps}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
GlassPanel.displayName = "GlassPanel"

interface GlassCardProps extends GlassPanelProps {
  title?: string
  description?: string
  header?: React.ReactNode
  footer?: React.ReactNode
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, title, description, header, footer, ...props }, ref) => {
    return (
      <GlassPanel
        ref={ref}
        className={cn("glass-card", className)}
        {...props}
      >
        {header && (
          <div className="mb-4">
            {header}
          </div>
        )}
        
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-text-secondary">
                {description}
              </p>
            )}
          </div>
        )}
        
        <div className="flex-1">
          {children}
        </div>
        
        {footer && (
          <div className="mt-4 pt-4 border-t border-border-muted">
            {footer}
          </div>
        )}
      </GlassPanel>
    )
  }
)
GlassCard.displayName = "GlassCard"

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  loading?: boolean
  children: React.ReactNode
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', glow = false, loading = false, disabled, ...props }, ref) => {
    const baseClasses = "glass-button interactive-scale"
    
    const variantClasses = {
      primary: "glass-button-primary",
      secondary: "bg-aurora-secondary/20 border-aurora-secondary/30 text-aurora-secondary hover:bg-aurora-secondary/30",
      ghost: "hover:bg-surface-glass-hover border-transparent"
    }
    
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg"
    }
    
    const glowClasses = glow ? "aurora-glow" : ""
    
    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          glowClasses,
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled || loading}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        {...props}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center"
            >
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            </motion.div>
          ) : (
            <motion.span
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    )
  }
)
GlassButton.displayName = "GlassButton"

export { GlassPanel, GlassCard, GlassButton }