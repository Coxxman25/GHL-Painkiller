'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface AnimatedCardProps {
  icon: LucideIcon
  title: string
  description?: string
  onClick?: () => void
  index?: number
  isSelected?: boolean
  className?: string
}

export function AnimatedCard({ 
  icon: Icon, 
  title, 
  description, 
  onClick, 
  index = 0,
  isSelected = false,
  className = '' 
}: AnimatedCardProps) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  }

  const glowVariants = {
    hidden: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`
        relative group cursor-pointer
        ${className}
      `}
    >
      {/* Glow Effect */}
      <motion.div
        variants={glowVariants}
        className="absolute -inset-0.5 bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-secondary)] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity"
      />
      
      {/* Card */}
      <div className={`
        relative h-full p-6 rounded-xl border backdrop-blur-sm transition-all duration-300
        ${isSelected 
          ? 'bg-[var(--surface-tertiary)] border-[var(--aurora-primary)]/50 shadow-lg shadow-[var(--aurora-primary)]/20' 
          : 'bg-[var(--surface-glass)] border-[var(--border-primary)] hover:border-[var(--aurora-primary)]/30'
        }
      `}>
        {/* Icon */}
        <motion.div
          variants={iconVariants}
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors
            ${isSelected 
              ? 'bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-secondary)] text-white' 
              : 'bg-[var(--surface-secondary)] text-[var(--aurora-primary)] group-hover:bg-gradient-to-r group-hover:from-[var(--aurora-primary)] group-hover:to-[var(--aurora-secondary)] group-hover:text-white'
            }
          `}
        >
          <Icon className="w-6 h-6" />
        </motion.div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className={`
            font-semibold transition-colors
            ${isSelected 
              ? 'text-[var(--text-primary)]' 
              : 'text-[var(--text-primary)] group-hover:text-[var(--aurora-primary)]'
            }
          `}>
            {title}
          </h3>
          
          {description && (
            <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-3 h-3 bg-[var(--aurora-primary)] rounded-full"
          />
        )}
      </div>
    </motion.div>
  )
}

interface AnimatedCardGridProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedCardGrid({ children, className = '' }: AnimatedCardGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}