"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Home, 
  MessageSquare, 
  Workflow, 
  BarChart3, 
  Settings, 
  User, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Monitor
} from "lucide-react"
import { cn } from "../../lib/utils"
import { useTheme } from "../../design-system/providers/theme-provider"
import { GlassPanel, GlassButton } from "../../design-system/components/glass"

interface SidebarItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  onClick?: () => void
  badge?: string | number
  active?: boolean
}

interface AuroraSidebarProps {
  items: SidebarItem[]
  activeItem?: string
  onItemClick?: (item: SidebarItem) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
}

export function AuroraSidebar({
  items,
  activeItem,
  onItemClick,
  collapsed = false,
  onToggleCollapse,
  className
}: AuroraSidebarProps) {
  const { theme, setTheme } = useTheme()
  
  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor
  }
  
  const ThemeIcon = themeIcons[theme]
  
  const cycleTheme = () => {
    const themes: Array<"light" | "dark" | "system"> = ["light", "dark", "system"]
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "h-full flex flex-col bg-surface-glass/50 backdrop-blur-glass border-r border-surface-glass-border",
        className
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-surface-glass-border">
        <motion.div
          layout
          className="flex items-center justify-between"
        >
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-primary to-aurora-secondary flex items-center justify-center">
                  <Workflow className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">
                    Spark Stack
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Aurora Edition
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {onToggleCollapse && (
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="p-2"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </GlassButton>
          )}
        </motion.div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item, index) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <motion.button
                onClick={() => {
                  item.onClick?.()
                  onItemClick?.(item)
                }}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2.5 rounded-element transition-all duration-200",
                  "hover:bg-surface-glass-hover",
                  isActive && "bg-aurora-primary/20 border border-aurora-primary/30 text-aurora-primary shadow-glow-aurora",
                  !isActive && "text-text-secondary hover:text-text-primary"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive && "text-aurora-primary"
                )} />
                
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between flex-1 min-w-0"
                    >
                      <span className="font-medium truncate">
                        {item.label}
                      </span>
                      {item.badge && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-2 px-2 py-0.5 text-xs font-medium bg-aurora-secondary/20 text-aurora-secondary rounded-pill"
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-surface-glass-border space-y-2">
        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <GlassButton
            variant="ghost"
            size="sm"
            onClick={cycleTheme}
            className={cn(
              "w-full justify-start space-x-3",
              collapsed && "justify-center"
            )}
          >
            <ThemeIcon className="w-4 h-4" />
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium capitalize"
                >
                  {theme} Mode
                </motion.span>
              )}
            </AnimatePresence>
          </GlassButton>
        </motion.div>

        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <GlassButton
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start space-x-3",
              collapsed && "justify-center"
            )}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-aurora-primary to-aurora-secondary flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-start min-w-0"
                >
                  <span className="text-sm font-medium text-text-primary truncate">
                    John Doe
                  </span>
                  <span className="text-xs text-text-secondary truncate">
                    john@example.com
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassButton>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Default sidebar items for Spark Stack
export const defaultSidebarItems: SidebarItem[] = [
  {
    id: 'home',
    label: 'Dashboard',
    icon: Home,
    href: '/'
  },
  {
    id: 'marketplace',
    label: 'Recipe Marketplace',
    icon: Workflow,
    href: '/marketplace'
  },
  {
    id: 'chat',
    label: 'AI Companion',
    icon: MessageSquare,
    href: '/chat',
    badge: '2'
  },
  {
    id: 'workflows',
    label: 'My Workflows',
    icon: BarChart3,
    href: '/workflows'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings'
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: HelpCircle,
    href: '/help'
  }
]