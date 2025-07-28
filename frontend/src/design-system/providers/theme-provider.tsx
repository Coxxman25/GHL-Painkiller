'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: 'dark' | 'light'
}

const initialState: ThemeProviderState = {
  theme: 'dark', // Default to dark mode
  setTheme: () => null,
  actualTheme: 'dark',
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'dark', // Default to dark mode
  storageKey = 'aurora-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [actualTheme, setActualTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement
      
      // Get stored theme or use default
      const storedTheme = localStorage.getItem(storageKey) as Theme
      const initialTheme = storedTheme || defaultTheme
      setTheme(initialTheme)

      // Calculate actual theme
      let resolvedTheme: 'dark' | 'light' = 'dark'
      
      if (initialTheme === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      } else {
        resolvedTheme = initialTheme
      }

      setActualTheme(resolvedTheme)

      // Apply theme classes
      root.classList.remove('light', 'dark')
      root.classList.add(resolvedTheme)

      // Set CSS custom properties for the theme
      if (resolvedTheme === 'dark') {
        root.style.setProperty('--background-primary', '#0A0A0F')
        root.style.setProperty('--background-secondary', '#111118')
        root.style.setProperty('--background-tertiary', '#1A1A24')
        root.style.setProperty('--text-primary', '#FFFFFF')
        root.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.7)')
        root.style.setProperty('--text-tertiary', 'rgba(255, 255, 255, 0.5)')
        root.style.setProperty('--border-primary', 'rgba(255, 255, 255, 0.1)')
        root.style.setProperty('--surface-glass', 'rgba(255, 255, 255, 0.05)')
        root.style.setProperty('--aurora-primary', '#00D4FF')
        root.style.setProperty('--aurora-secondary', '#FF0080')
        root.style.setProperty('--aurora-tertiary', '#00FF88')
      } else {
        root.style.setProperty('--background-primary', '#FFFFFF')
        root.style.setProperty('--background-secondary', '#F8FAFC')
        root.style.setProperty('--background-tertiary', '#F1F5F9')
        root.style.setProperty('--text-primary', '#0F172A')
        root.style.setProperty('--text-secondary', 'rgba(15, 23, 42, 0.7)')
        root.style.setProperty('--text-tertiary', 'rgba(15, 23, 42, 0.5)')
        root.style.setProperty('--border-primary', 'rgba(0, 0, 0, 0.1)')
        root.style.setProperty('--surface-glass', 'rgba(0, 0, 0, 0.05)')
        root.style.setProperty('--aurora-primary', '#00D4FF')
        root.style.setProperty('--aurora-secondary', '#FF0080')
        root.style.setProperty('--aurora-tertiary', '#00FF88')
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement

      // Calculate actual theme
      let resolvedTheme: 'dark' | 'light' = 'dark'
      
      if (theme === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      } else {
        resolvedTheme = theme
      }

      setActualTheme(resolvedTheme)

      // Apply theme classes
      root.classList.remove('light', 'dark')
      root.classList.add(resolvedTheme)

      // Update CSS custom properties
      if (resolvedTheme === 'dark') {
        root.style.setProperty('--background-primary', '#0A0A0F')
        root.style.setProperty('--background-secondary', '#111118')
        root.style.setProperty('--background-tertiary', '#1A1A24')
        root.style.setProperty('--text-primary', '#FFFFFF')
        root.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.7)')
        root.style.setProperty('--text-tertiary', 'rgba(255, 255, 255, 0.5)')
        root.style.setProperty('--border-primary', 'rgba(255, 255, 255, 0.1)')
        root.style.setProperty('--surface-glass', 'rgba(255, 255, 255, 0.05)')
      } else {
        root.style.setProperty('--background-primary', '#FFFFFF')
        root.style.setProperty('--background-secondary', '#F8FAFC')
        root.style.setProperty('--background-tertiary', '#F1F5F9')
        root.style.setProperty('--text-primary', '#0F172A')
        root.style.setProperty('--text-secondary', 'rgba(15, 23, 42, 0.7)')
        root.style.setProperty('--text-tertiary', 'rgba(15, 23, 42, 0.5)')
        root.style.setProperty('--border-primary', 'rgba(0, 0, 0, 0.1)')
        root.style.setProperty('--surface-glass', 'rgba(0, 0, 0, 0.05)')
      }

      // Store theme preference
      localStorage.setItem(storageKey, theme)
    }
  }, [theme, storageKey])

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== "undefined" && theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = () => {
        const resolvedTheme = mediaQuery.matches ? 'dark' : 'light'
        setActualTheme(resolvedTheme)
        
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(resolvedTheme)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme)
    },
    actualTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}