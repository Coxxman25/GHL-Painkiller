"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"
import { GlassPanel } from "../../design-system/components/glass"

interface AppLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
  rightPanel?: React.ReactNode
  className?: string
}

export function AppLayout({ 
  children, 
  sidebar, 
  header, 
  rightPanel, 
  className 
}: AppLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background font-inter", className)}>
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-aurora-primary/5 via-aurora-secondary/5 to-aurora-tertiary/5 pointer-events-none" />
      
      <div className="relative flex h-screen">
        {/* Sidebar */}
        {sidebar && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-shrink-0 w-64 border-r border-border-primary/50"
          >
            {sidebar}
          </motion.aside>
        )}
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          {header && (
            <motion.header
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
              className="flex-shrink-0 border-b border-border-primary/50"
            >
              {header}
            </motion.header>
          )}
          
          {/* Main content */}
          <main className="flex-1 flex overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
              className="flex-1 overflow-auto custom-scrollbar"
            >
              {children}
            </motion.div>
            
            {/* Right panel */}
            <AnimatePresence>
              {rightPanel && (
                <motion.aside
                  initial={{ x: 400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 400, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex-shrink-0 w-96 border-l border-border-primary/50"
                >
                  {rightPanel}
                </motion.aside>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}

interface PageContainerProps {
  children: React.ReactNode
  title?: string
  description?: string
  actions?: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export function PageContainer({ 
  children, 
  title, 
  description, 
  actions, 
  className,
  maxWidth = 'full'
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full'
  }

  return (
    <div className={cn("p-6", maxWidthClasses[maxWidth], className)}>
      {(title || description || actions) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {title && (
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-text-secondary text-lg">
                  {description}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex-shrink-0 ml-6">
                {actions}
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface GridLayoutProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function GridLayout({ 
  children, 
  columns = 3, 
  gap = 'md', 
  className 
}: GridLayoutProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    12: 'grid-cols-12'
  }
  
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  }

  return (
    <div className={cn(
      "grid",
      columnClasses[columns],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}

interface FlexLayoutProps {
  children: React.ReactNode
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  wrap?: boolean
  className?: string
}

export function FlexLayout({ 
  children, 
  direction = 'row', 
  align = 'start',
  justify = 'start',
  gap = 'md',
  wrap = false,
  className 
}: FlexLayoutProps) {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col'
  }
  
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }
  
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }
  
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  }

  return (
    <div className={cn(
      "flex",
      directionClasses[direction],
      alignClasses[align],
      justifyClasses[justify],
      gapClasses[gap],
      wrap && 'flex-wrap',
      className
    )}>
      {children}
    </div>
  )
}