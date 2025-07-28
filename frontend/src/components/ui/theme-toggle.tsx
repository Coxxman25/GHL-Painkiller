'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/design-system/providers/theme-provider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-[var(--surface-glass)] border border-[var(--border-primary)] rounded-full p-1 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--aurora-primary)]/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Track */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-secondary)] opacity-20" />
      
      {/* Thumb */}
      <motion.div
        className="relative w-4 h-4 bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-secondary)] rounded-full shadow-lg flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 0 : 20,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <motion.div
          animate={{
            rotate: theme === 'dark' ? 0 : 180,
            scale: theme === 'dark' ? 1 : 0.8,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          {theme === 'dark' ? (
            <Moon className="w-2.5 h-2.5 text-white" />
          ) : (
            <Sun className="w-2.5 h-2.5 text-white" />
          )}
        </motion.div>
      </motion.div>
      
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Moon className={`w-3 h-3 transition-opacity ${theme === 'dark' ? 'opacity-100 text-[var(--aurora-primary)]' : 'opacity-30 text-[var(--text-tertiary)]'}`} />
        <Sun className={`w-3 h-3 transition-opacity ${theme === 'light' ? 'opacity-100 text-[var(--aurora-primary)]' : 'opacity-30 text-[var(--text-tertiary)]'}`} />
      </div>
    </motion.button>
  )
}