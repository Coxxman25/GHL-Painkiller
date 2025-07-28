'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  LayoutGrid, 
  GitFork, 
  Settings,
  Sun,
  Moon,
  Monitor,
  ChevronRight
} from 'lucide-react'
import { useTheme } from '@/design-system/providers/theme-provider'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { AIChatOverlay } from '@/components/ai/AIChatOverlay'

interface AppShellProps {
  children?: React.ReactNode
  activePanel: 'ai-companion' | 'marketplace' | 'workflow-builder' | 'settings'
  onPanelChange: (panel: 'ai-companion' | 'marketplace' | 'workflow-builder' | 'settings') => void
  sidebarContent?: React.ReactNode
  rightPanelContent?: React.ReactNode
}

export function AppShell({ 
  children, 
  activePanel, 
  onPanelChange, 
  sidebarContent,
  rightPanelContent 
}: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAIChatVisible, setIsAIChatVisible] = useState(false)
  const { theme, setTheme } = useTheme()

  const navigationItems = [
    {
      id: 'ai-companion' as const,
      icon: MessageSquare,
      label: 'AI Companion',
      description: 'Chat with your automation assistant'
    },
    {
      id: 'marketplace' as const,
      icon: LayoutGrid,
      label: 'Recipe Marketplace',
      description: 'Browse pre-built automations'
    },
    {
      id: 'workflow-builder' as const,
      icon: GitFork,
      label: 'Workflow Builder',
      description: 'Build custom automations'
    },
    {
      id: 'settings' as const,
      icon: Settings,
      label: 'Settings',
      description: 'Configure your workspace'
    }
  ]

  const themeOptions = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' }
  ]

  return (
    <div className="h-screen bg-[var(--background-primary)] flex overflow-hidden">
      {/* Panel 1: Fixed Icon Navigation Bar */}
      <div className="w-16 bg-[var(--background-secondary)]/50 backdrop-blur-xl border-r border-[var(--border-primary)] flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-[var(--border-primary)]">
          <div className="w-8 h-8 bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-secondary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex-1 py-4">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activePanel === item.id
            const isAICompanion = item.id === 'ai-companion'
            
            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  if (isAICompanion) {
                    // For AI Companion, only toggle the chat overlay
                    setIsAIChatVisible(true)
                  } else {
                    // For other panels, change the active panel
                    onPanelChange(item.id)
                  }
                }}
                onMouseEnter={() => {
                  if (isAICompanion) {
                    setIsAIChatVisible(true)
                  } else {
                    setIsSidebarOpen(true)
                  }
                }}
                className={`
                  w-12 h-12 mx-2 mb-2 rounded-xl flex items-center justify-center transition-all relative group
                  ${isActive 
                    ? 'bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-secondary)] text-white shadow-lg shadow-[var(--aurora-primary)]/25' 
                    : 'bg-[var(--surface-glass)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-primary)]'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-3 py-2 bg-[var(--background-tertiary)] border border-[var(--border-primary)] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  <div className="text-sm font-medium text-[var(--text-primary)]">{item.label}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{item.description}</div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Theme Switcher */}
        <div className="p-2 border-t border-[var(--border-primary)]">
          <div className="relative group">
            <button className="w-12 h-12 rounded-xl bg-[var(--surface-glass)] hover:bg-[var(--surface-hover)] border border-[var(--border-primary)] flex items-center justify-center transition-all">
              {theme === 'light' && <Sun className="w-5 h-5 text-[var(--text-secondary)]" />}
              {theme === 'dark' && <Moon className="w-5 h-5 text-[var(--text-secondary)]" />}
              {theme === 'system' && <Monitor className="w-5 h-5 text-[var(--text-secondary)]" />}
            </button>
            
            {/* Theme Options */}
            <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
              <div className="bg-[var(--background-tertiary)] border border-[var(--border-primary)] rounded-lg p-1 space-y-1">
                {themeOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={`
                        w-full px-3 py-2 rounded-md flex items-center space-x-2 text-sm transition-colors
                        ${theme === option.value 
                          ? 'bg-[var(--aurora-primary)] text-white' 
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{option.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel 2: Contextual Tools & Components Panel */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-[var(--background-secondary)]/50 backdrop-blur-xl border-r border-[var(--border-primary)] overflow-hidden"
            onMouseLeave={() => setIsSidebarOpen(false)}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="h-16 px-6 flex items-center justify-between border-b border-[var(--border-primary)]">
                <div>
                  <h2 className="font-semibold text-[var(--text-primary)]">
                    {navigationItems.find(item => item.id === activePanel)?.label}
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {navigationItems.find(item => item.id === activePanel)?.description}
                  </p>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg bg-[var(--surface-glass)] hover:bg-[var(--surface-hover)] border border-[var(--border-primary)] flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {sidebarContent}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel 3: Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>

      {/* Panel 4: Right Panel (Automation Canvas) */}
      {rightPanelContent && (
        <div className="w-96 bg-[var(--background-secondary)]/50 backdrop-blur-xl border-l border-[var(--border-primary)] overflow-hidden">
          {rightPanelContent}
        </div>
      )}

      {/* AI Chat Overlay */}
      <AIChatOverlay
        isVisible={isAIChatVisible}
        onClose={() => setIsAIChatVisible(false)}
        onMouseEnter={() => setIsAIChatVisible(true)}
        onMouseLeave={() => {
          // Don't auto-hide on mouse leave - let user explicitly close it
        }}
      />
    </div>
  )
}