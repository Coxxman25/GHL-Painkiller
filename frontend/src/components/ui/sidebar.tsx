'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface AccordionItem {
  id: string
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

interface SidebarAccordionProps {
  items: AccordionItem[]
  className?: string
}

export function SidebarAccordion({ items, className = '' }: SidebarAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(items.filter(item => item.defaultOpen).map(item => item.id))
  )

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id)
        
        return (
          <div key={item.id} className="border border-[var(--border-primary)] rounded-lg overflow-hidden">
            {/* Header */}
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-4 py-3 bg-[var(--surface-glass)] hover:bg-[var(--surface-hover)] flex items-center justify-between transition-colors"
            >
              <div className="flex items-center space-x-3">
                {item.icon && (
                  <div className="text-[var(--aurora-primary)]">
                    {item.icon}
                  </div>
                )}
                <span className="font-medium text-[var(--text-primary)]">
                  {item.title}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
              </motion.div>
            </button>

            {/* Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-[var(--background-tertiary)]/50">
                    {item.children}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

interface SidebarItemProps {
  icon?: React.ReactNode
  title: string
  description?: string
  onClick?: () => void
  isActive?: boolean
  className?: string
}

export function SidebarItem({ 
  icon, 
  title, 
  description, 
  onClick, 
  isActive = false,
  className = '' 
}: SidebarItemProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`
        w-full p-3 rounded-lg text-left transition-all group
        ${isActive 
          ? 'bg-gradient-to-r from-[var(--aurora-primary)]/20 to-[var(--aurora-secondary)]/20 border border-[var(--aurora-primary)]/30' 
          : 'hover:bg-[var(--surface-hover)] border border-transparent'
        }
        ${className}
      `}
    >
      <div className="flex items-start space-x-3">
        {icon && (
          <div className={`
            mt-0.5 transition-colors
            ${isActive 
              ? 'text-[var(--aurora-primary)]' 
              : 'text-[var(--text-secondary)] group-hover:text-[var(--aurora-primary)]'
            }
          `}>
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className={`
            font-medium transition-colors
            ${isActive 
              ? 'text-[var(--aurora-primary)]' 
              : 'text-[var(--text-primary)] group-hover:text-[var(--aurora-primary)]'
            }
          `}>
            {title}
          </div>
          {description && (
            <div className="text-sm text-[var(--text-secondary)] mt-1">
              {description}
            </div>
          )}
        </div>
        <ChevronRight className={`
          w-4 h-4 mt-0.5 transition-all
          ${isActive 
            ? 'text-[var(--aurora-primary)] opacity-100' 
            : 'text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--aurora-primary)]'
          }
        `} />
      </div>
    </motion.button>
  )
}

interface SidebarSectionProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function SidebarSection({ title, children, className = '' }: SidebarSectionProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider px-3">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  )
}