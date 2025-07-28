'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { SnippetCard } from './SnippetCard';
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  Clock,
  Zap,
  Users,
  Mail,
  Phone,
  Calendar,
  BarChart3
} from 'lucide-react';

// Sample snippet data matching the AI mockup
const sampleSnippets = [
  {
    id: 1,
    title: 'Mixed Call Text Back Up Flow',
    description: 'Automatically follow up with leads who missed calls via text message with personalized responses.',
    category: 'Lead Generation',
    rating: 4.8,
    downloads: 2340,
    difficulty: 'Beginner',
    estimatedTime: '5 min',
    tags: ['SMS', 'Follow-up', 'Automation'],
    isNew: true,
    isPro: false
  },
  {
    id: 2,
    title: 'Lead Score Calculator',
    description: 'Automatically score leads based on engagement, demographics, and behavior patterns.',
    category: 'Lead Generation', 
    rating: 4.6,
    downloads: 1890,
    difficulty: 'Intermediate',
    estimatedTime: '10 min',
    tags: ['Scoring', 'Analytics', 'Qualification'],
    isNew: false,
    isPro: true
  },
  {
    id: 3,
    title: 'Welcome Email Series',
    description: 'Multi-step welcome email sequence for new leads with personalized content.',
    category: 'Nurture',
    rating: 4.9,
    downloads: 3120,
    difficulty: 'Beginner',
    estimatedTime: '7 min',
    tags: ['Email', 'Welcome', 'Series'],
    isNew: false,
    isPro: false
  },
  {
    id: 4,
    title: 'Appointment Reminder Flow',
    description: 'Automated appointment reminders via SMS and email with confirmation options.',
    category: 'Follow-up',
    rating: 4.7,
    downloads: 2680,
    difficulty: 'Beginner',
    estimatedTime: '8 min',
    tags: ['Appointments', 'Reminders', 'SMS'],
    isNew: false,
    isPro: false
  },
  {
    id: 5,
    title: 'Abandoned Cart Recovery',
    description: 'Re-engage customers who abandoned their cart with targeted follow-up sequences.',
    category: 'Conversion',
    rating: 4.5,
    downloads: 1560,
    difficulty: 'Advanced',
    estimatedTime: '15 min',
    tags: ['E-commerce', 'Recovery', 'Sales'],
    isNew: false,
    isPro: true
  },
  {
    id: 6,
    title: 'Win-Back Campaign',
    description: 'Automated campaign to re-engage inactive customers with special offers.',
    category: 'Nurture',
    rating: 4.4,
    downloads: 980,
    difficulty: 'Intermediate',
    estimatedTime: '12 min',
    tags: ['Win-back', 'Offers', 'Retention'],
    isNew: false,
    isPro: false
  }
];

const categories = [
  { name: 'All Categories', icon: <Zap className="h-4 w-4" />, count: sampleSnippets.length },
  { name: 'Lead Generation', icon: <Users className="h-4 w-4" />, count: 2 },
  { name: 'Follow-up', icon: <Mail className="h-4 w-4" />, count: 1 },
  { name: 'Nurture', icon: <Phone className="h-4 w-4" />, count: 2 },
  { name: 'Conversion', icon: <Calendar className="h-4 w-4" />, count: 1 },
  { name: 'Analytics', icon: <BarChart3 className="h-4 w-4" />, count: 0 }
];

const sortOptions = [
  { label: 'Most Popular', value: 'popular', icon: <TrendingUp className="h-3 w-3" /> },
  { label: 'Highest Rated', value: 'rating', icon: <Star className="h-3 w-3" /> },
  { label: 'Newest', value: 'newest', icon: <Clock className="h-3 w-3" /> }
];

export const MarketplaceInterface = ({ className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('popular');
  const [filteredSnippets, setFilteredSnippets] = useState(sampleSnippets);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterSnippets(query, selectedCategory, sortBy);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterSnippets(searchQuery, category, sortBy);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    filterSnippets(searchQuery, selectedCategory, sort);
  };

  const filterSnippets = (query, category, sort) => {
    let filtered = [...sampleSnippets];

    // Filter by search query
    if (query) {
      filtered = filtered.filter(snippet => 
        snippet.title.toLowerCase().includes(query.toLowerCase()) ||
        snippet.description.toLowerCase().includes(query.toLowerCase()) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Filter by category
    if (category !== 'All Categories') {
      filtered = filtered.filter(snippet => snippet.category === category);
    }

    // Sort
    switch (sort) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
    }

    setFilteredSnippets(filtered);
  };

  const handleDeploy = (snippet) => {
    console.log('Deploying snippet:', snippet);
    // TODO: Implement deployment logic
  };

  return (
    <div className={`h-full flex ${className}`}>
      {/* Left Sidebar - Categories */}
      <div className="w-64 glass-sidebar relative">
        <AnimatedBorder 
          variant="home" 
          position={['right']}
          speed={0.3} 
          opacity={0.2}
          className="absolute inset-0 pointer-events-none"
        />
        
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 gradient-text-home">
            <Filter className="h-4 w-4 float" />
            Categories
          </h3>
          
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryChange(category.name)}
                className={`w-full flex items-center justify-between p-2 rounded-md text-left transition-all duration-200 micro-hover ${
                  selectedCategory === category.name
                    ? 'bg-primary/10 border border-primary/20 glow-home'
                    : 'hover:bg-muted/50 glass-card border border-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span className="text-xs font-medium">{category.name}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Search and Sort */}
        <div className="glass-header p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold gradient-text-home">Automation Snippets</h1>
              <p className="text-sm text-muted-foreground">
                Ready-to-use automation templates for your GHL workflows
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange(option.value)}
                  className="text-xs"
                >
                  {option.icon}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search automation snippets..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 focus-ring-home glass-card border-white/20"
            />
          </div>
        </div>

        {/* Snippets Grid */}
        <ScrollArea className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onDeploy={handleDeploy}
                className="h-fit"
              />
            ))}
          </div>
          
          {filteredSnippets.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-card border-white/20 p-8 rounded-lg max-w-md mx-auto">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No snippets found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or category filters
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};