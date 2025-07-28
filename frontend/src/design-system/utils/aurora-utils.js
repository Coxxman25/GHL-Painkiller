import { designTokens } from '../tokens/design-tokens.js'

/**
 * Aurora Design System Utilities
 * Provides helper functions for working with the Aurora design system
 */

/**
 * Generates CSS custom properties from design tokens
 */
export function generateCSSVariables(tokens: typeof designTokens) {
  const cssVars: Record<string, string> = {}
  
  // Process colors
  Object.entries(tokens.colors).forEach(([category, colors]) => {
    if (typeof colors === 'object') {
      Object.entries(colors).forEach(([shade, value]) => {
        cssVars[`--aurora-${category}-${shade}`] = value
      })
    } else {
      cssVars[`--aurora-${category}`] = colors
    }
  })
  
  // Process spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value
  })
  
  // Process typography
  Object.entries(tokens.typography.fontSizes).forEach(([key, value]) => {
    cssVars[`--font-size-${key}`] = value
  })
  
  return cssVars
}

/**
 * Creates a responsive breakpoint utility
 */
export function createBreakpoint(size: keyof typeof designTokens.breakpoints) {
  return `@media (min-width: ${designTokens.breakpoints[size]})`
}

/**
 * Generates Aurora gradient classes
 */
export function createGradient(from: string, to: string, direction = 'to right') {
  return `linear-gradient(${direction}, ${from}, ${to})`
}

/**
 * Creates glass morphism effect
 */
export function createGlassEffect(opacity = 0.1, blur = '20px') {
  return {
    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur})`,
    border: '1px solid rgba(255, 255, 255, 0.2)',
  }
}

/**
 * Animation utilities
 */
export const animations = {
  fadeIn: 'fade-in 0.3s ease-out',
  slideUp: 'slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  glow: 'glow 2s ease-in-out infinite alternate',
  scale: 'scale 0.2s ease-out',
}

/**
 * Common Aurora component variants
 */
export const variants = {
  glass: {
    primary: 'glass-panel bg-aurora-primary/10 border-aurora-primary/20',
    secondary: 'glass-panel bg-aurora-secondary/10 border-aurora-secondary/20',
    neutral: 'glass-panel bg-surface-glass border-surface-glass-border',
  },
  button: {
    primary: 'glass-button-primary',
    secondary: 'glass-button bg-aurora-secondary/20 border-aurora-secondary/30 text-aurora-secondary',
    ghost: 'glass-button hover:bg-surface-glass-hover',
  },
  text: {
    gradient: 'text-gradient-aurora',
    glow: 'text-glow',
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    accent: 'text-text-accent',
  }
}

/**
 * Spacing utilities based on design tokens
 */
export const spacing = designTokens.spacing

/**
 * Typography utilities
 */
export const typography = {
  ...designTokens.typography,
  classes: {
    h1: 'text-4xl font-bold tracking-tight',
    h2: 'text-3xl font-semibold tracking-tight',
    h3: 'text-2xl font-semibold tracking-tight',
    h4: 'text-xl font-semibold tracking-tight',
    h5: 'text-lg font-semibold tracking-tight',
    h6: 'text-base font-semibold tracking-tight',
    body: 'text-base font-normal',
    caption: 'text-sm font-normal text-text-secondary',
    code: 'font-mono text-sm bg-surface-glass px-2 py-1 rounded-element',
  }
}