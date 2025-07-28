'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  SortAsc, 
  Clock, 
  Star, 
  Download,
  Zap,
  Mail,
  Calendar,
  Users,
  MessageSquare,
  Bell,
  Database,
  Workflow,
  Target,
  BarChart3,
  Shield,
  Smartphone,
  Globe,
  CreditCard,
  FileText,
  Settings
} from 'lucide-react'

import { AppShell } from '@/components/layout/app-shell'
import { AnimatedCard, AnimatedCardGrid } from '@/components/ui/animated-card'
import { SidebarAccordion, SidebarItem, SidebarSection } from '@/components/ui/sidebar'
import { TriageModal } from '@/components/onboarding/triage-modal'

// Mock data for recipes
const recipes = [
  {
    id: 1,
    title: 'Welcome Email Sequence',
    description: 'Automated welcome series for new leads',
    icon: Mail,
    category: 'Email Marketing',
    setupTime: '5 min',
    downloads: 1234,
    rating: 4.8,
    tags: ['email', 'automation', 'welcome']
  },
  {
    id: 2,
    title: 'Slack Notifications',
    description: 'Send team notifications to Slack channels',
    icon: MessageSquare,
    category: 'Communication',
    setupTime: '3 min',
    downloads: 892,
    rating: 4.9,
    tags: ['slack', 'notifications', 'team']
  },
  {
    id: 3,
    title: 'Calendar Sync',
    description: 'Sync appointments across multiple calendars',
    icon: Calendar,
    category: 'Scheduling',
    setupTime: '8 min',
    downloads: 567,
    rating: 4.7,
    tags: ['calendar', 'sync', 'appointments']
  },
  {
    id: 4,
    title: 'Database Sync',
    description: 'Keep your CRM and external databases in sync',
    icon: Database,
    category: 'Data Management',
    setupTime: '12 min',
    downloads: 445,
    rating: 4.6,
    tags: ['database', 'crm', 'sync']
  },
  {
    id: 5,
    title: 'Lead Scoring',
    description: 'Automatically score and qualify leads',
    icon: Target,
    category: 'Lead Management',
    setupTime: '10 min',
    downloads: 723,
    rating: 4.8,
    tags: ['leads', 'scoring', 'qualification']
  },
  {
    id: 6,
    title: 'Performance Monitor',
    description: 'Track and analyze automation performance',
    icon: BarChart3,
    category: 'Analytics',
    setupTime: '6 min',
    downloads: 334,
    rating: 4.5,
    tags: ['analytics', 'performance', 'monitoring']
  }
]

const categories = [
  'All Categories',
  'Email Marketing',
  'Communication', 
  'Scheduling',
  'Data Management',
  'Lead Management',
  'Analytics'
]

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'recent', label: 'Recently Added' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name A-Z' }
]

export default function MarketplacePage() {
  const [activePanel, setActivePanel] = useState('marketplace')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [sortBy, setSortBy] = useState('popular')
  const [showTriageModal, setShowTriageModal] = useState(false)

  // Check if user is first time visitor
  useEffect(() => {
    const hasSeenTriage = localStorage.getItem('triggerstack-triage-completed')
    if (!hasSeenTriage) {
      setShowTriageModal(true)
    }
  }, [])

  const handleTriageComplete = (context) => {
    localStorage.setItem('triggerstack-triage-completed', 'true')
    localStorage.setItem('triggerstack-user-context', context)
    setShowTriageModal(false)
  }

  // Filter and sort recipes
  const filteredRecipes = recipes
    .filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All Categories' || recipe.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.downloads - a.downloads
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.title.localeCompare(b.title)
        case 'recent':
        default:
          return b.id - a.id
      }
    })

  // Sidebar content for marketplace
  const sidebarContent = (
    <div className="p-4 space-y-6">
      {/* Search */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
          Search & Filter
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--surface-glass)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--aurora-primary)]/50 focus:border-[var(--aurora-primary)]/50 transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <SidebarSection title="Categories">
        {categories.map((category) => (
          <SidebarItem
            key={category}
            title={category}
            isActive={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </SidebarSection>

      {/* Sort Options */}
      <SidebarSection title="Sort By">
        {sortOptions.map((option) => (
          <SidebarItem
            key={option.value}
            title={option.label}
            isActive={sortBy === option.value}
            onClick={() => setSortBy(option.value)}
          />
        ))}
      </SidebarSection>

      {/* Quick Stats */}
      <div className="p-4 bg-[var(--surface-glass)] border border-[var(--border-primary)] rounded-lg">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
          Marketplace Stats
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-secondary)]">Total Recipes</span>
            <span className="text-[var(--aurora-primary)] font-medium">{recipes.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-secondary)]">Categories</span>
            <span className="text-[var(--aurora-primary)] font-medium">{categories.length - 1}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-secondary)]">Total Downloads</span>
            <span className="text-[var(--aurora-primary)] font-medium">
              {recipes.reduce((sum, recipe) => sum + recipe.downloads, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  // Right panel content for recipe details
  const rightPanelContent = selectedRecipe && (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[var(--border-primary)]">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-secondary)] rounded-xl flex items-center justify-center">
            <selectedRecipe.icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {selectedRecipe.title}
            </h2>
            <p className="text-[var(--text-secondary)] mt-1">
              {selectedRecipe.description}
            </p>
            <div className="flex items-center space-x-4 mt-3 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-[var(--aurora-primary)]" />
                <span className="text-[var(--text-secondary)]">{selectedRecipe.setupTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="w-4 h-4 text-[var(--aurora-primary)]" />
                <span className="text-[var(--text-secondary)]">{selectedRecipe.downloads.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-[var(--aurora-tertiary)]" />
                <span className="text-[var(--text-secondary)]">{selectedRecipe.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Tags */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {selectedRecipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[var(--surface-glass)] border border-[var(--border-primary)] rounded-full text-xs text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Setup Steps */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Setup Steps</h3>
          <div className="space-y-3">
            {[
              'Configure trigger conditions',
              'Set up data mapping',
              'Test the automation',
              'Deploy to production'
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[var(--aurora-primary)] text-white rounded-full flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
                <span className="text-[var(--text-secondary)]">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full h-12 bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-secondary)] text-white rounded-xl font-medium flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-[var(--aurora-primary)]/25 transition-all">
          <Download className="w-4 h-4" />
          <span>Install Recipe</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      <AppShell
        activePanel={activePanel}
        onPanelChange={setActivePanel}
        sidebarContent={sidebarContent}
        rightPanelContent={rightPanelContent}
      >
        {/* Main Content Area */}
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-primary)]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                  Recipe Marketplace
                </h1>
                <p className="text-[var(--text-secondary)] mt-1">
                  Discover powerful automations built by the community
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 bg-[var(--surface-glass)] border border-[var(--border-primary)] rounded-lg">
                  <span className="text-sm text-[var(--text-secondary)]">
                    {filteredRecipes.length} recipes found
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatedCardGrid>
              {filteredRecipes.map((recipe, index) => (
                <AnimatedCard
                  key={recipe.id}
                  icon={recipe.icon}
                  title={recipe.title}
                  description={recipe.description}
                  index={index}
                  isSelected={selectedRecipe?.id === recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                />
              ))}
            </AnimatedCardGrid>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[var(--surface-glass)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[var(--text-tertiary)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  No recipes found
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </AppShell>

      {/* Triage Modal */}
      <TriageModal
        isOpen={showTriageModal}
        onClose={() => setShowTriageModal(false)}
        onComplete={handleTriageComplete}
      />
    </>
  );
}