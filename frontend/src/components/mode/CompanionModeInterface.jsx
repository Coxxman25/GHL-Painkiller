'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Play,
  Eye,
  Heart,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Users,
  Target,
  BarChart3,
  Zap,
  Clock,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react';

export const CompanionModeInterface = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSnippet, setSelectedSnippet] = useState(null);

  const categories = [
    { name: 'All', count: 24, color: 'text-gray-500' },
    { name: 'Lead Management', count: 8, color: 'text-green-500' },
    { name: 'Communication', count: 6, color: 'text-blue-500' },
    { name: 'Sales & Conversion', count: 5, color: 'text-purple-500' },
    { name: 'Appointment', count: 3, color: 'text-orange-500' },
    { name: 'Analytics', count: 2, color: 'text-cyan-500' }
  ];

  const automationSnippets = [
    {
      id: 1,
      title: 'Missed Call Auto-Follow Up Flow',
      description: 'Instantly SMS & Email anyone who missed your call',
      category: 'Communication',
      rating: 4.9,
      downloads: 2340,
      price: 'Free',
      tags: ['SMS', 'Email', 'Follow-up'],
      author: 'TriggerStack',
      difficulty: 'Beginner',
      estimatedTime: '5 min setup',
      icon: <Phone className="h-5 w-5" />,
      color: 'text-red-500 bg-red-500/10 border-red-500/20',
      featured: true
    },
    {
      id: 2,
      title: 'Lead Score Calculator',
      description: 'Automatically score leads based on actions',
      category: 'Lead Management',
      rating: 4.8,
      downloads: 1890,
      price: 'Pro',
      tags: ['Scoring', 'Analytics', 'Automation'],
      author: 'GHL Expert',
      difficulty: 'Intermediate',
      estimatedTime: '15 min setup',
      icon: <BarChart3 className="h-5 w-5" />,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      featured: false
    },
    {
      id: 3,
      title: 'Welcome Email Series',
      description: '5-email nurture sequence for new leads',
      category: 'Communication',
      rating: 4.7,
      downloads: 1560,
      price: 'Free',
      tags: ['Email', 'Nurture', 'Sequence'],
      author: 'Marketing Pro',
      difficulty: 'Beginner',
      estimatedTime: '10 min setup',
      icon: <Mail className="h-5 w-5" />,
      color: 'text-green-500 bg-green-500/10 border-green-500/20',
      featured: true
    },
    {
      id: 4,
      title: 'Appointment Reminder Flow',
      description: 'SMS & email reminders for appointments',
      category: 'Appointment',
      rating: 4.9,
      downloads: 1234,
      price: 'Free',
      tags: ['Appointment', 'Reminder', 'SMS'],
      author: 'TriggerStack',
      difficulty: 'Beginner',
      estimatedTime: '8 min setup',
      icon: <Calendar className="h-5 w-5" />,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      featured: false
    },
    {
       id: 5,
       title: 'Abandoned Cart Recovery',
       description: "Re-engage customers who didn't complete purchase",
       category: 'Sales & Conversion',
       rating: 4.6,
       downloads: 987,
       price: 'Pro',
       tags: ['E-commerce', 'Recovery', 'Sales'],
       author: 'Sales Guru',
       difficulty: 'Intermediate',
       estimatedTime: '20 min setup',
       icon: <Target className="h-5 w-5" />,
       color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
       featured: false
     },
    {
      id: 6,
      title: 'Win-Back Campaign',
      description: 'Re-engage inactive clients with special offers',
      category: 'Sales & Conversion',
      rating: 4.5,
      downloads: 756,
      price: 'Pro',
      tags: ['Win-back', 'Campaign', 'Offers'],
      author: 'Retention Expert',
      difficulty: 'Advanced',
      estimatedTime: '25 min setup',
      icon: <Heart className="h-5 w-5" />,
      color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
      featured: false
    }
  ];

  const filteredSnippets = automationSnippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || snippet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'text-green-500 bg-green-500/10 border-green-500/20',
      'Intermediate': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
      'Advanced': 'text-red-500 bg-red-500/10 border-red-500/20'
    };
    return colors[difficulty] || 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  };

  const handleDeploySnippet = (snippet) => {
    console.log('Deploying snippet:', snippet.title);
  };

  return (
    <div className={`w-96 relative glass-sidebar ${className}`}>
      {/* Subtle animated left border for the panel */}
      <AnimatedBorder 
        variant="mixed" 
        position={['left']}
        speed={0.4} 
        opacity={0.2}
        className="absolute inset-0 pointer-events-none"
      />
      
      <div className="p-4 space-y-4 h-full overflow-hidden flex flex-col">
        {/* Header */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 gradient-text-home">
            <Zap className="h-4 w-4 float" />
            Automation Snippets
          </h3>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search automation snippets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 focus-ring-home glass-card border-white/20"
            />
          </div>
          
          {/* Categories */}
          <div className="space-y-1 mb-3">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full justify-start text-xs h-8 ${
                  selectedCategory === category.name 
                    ? 'bg-primary/20 text-primary' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${category.color.replace('text-', 'bg-')}`} />
                {category.name}
                <Badge variant="secondary" className="ml-auto text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Snippet List */}
        <ScrollArea className="flex-1">
          <div className="space-y-3 pr-2">
            {filteredSnippets.map((snippet) => (
              <Card 
                key={snippet.id} 
                variant="home" 
                animatedBorder 
                className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  selectedSnippet?.id === snippet.id ? 'ring-2 ring-primary/50' : ''
                } ${snippet.featured ? 'ring-1 ring-yellow-500/30' : ''}`}
                onClick={() => setSelectedSnippet(snippet)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-md ${snippet.color} flex-shrink-0`}>
                      {snippet.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <CardTitle className="text-sm leading-tight">{snippet.title}</CardTitle>
                        {snippet.featured && (
                          <Award className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                        {snippet.description}
                      </p>
                      
                      {/* Rating and Stats */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {snippet.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {snippet.downloads}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {snippet.estimatedTime}
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {snippet.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {snippet.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{snippet.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Bottom Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(snippet.difficulty)}>
                            {snippet.difficulty}
                          </Badge>
                          <Badge variant={snippet.price === 'Free' ? 'default' : 'secondary'} className="text-xs">
                            {snippet.price}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Preview snippet:', snippet.title);
                            }}
                            className="h-6 w-6 p-0 hover:bg-primary/20"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeploySnippet(snippet);
                            }}
                            className="h-6 w-6 p-0 hover:bg-primary/20"
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <h4 className="text-xs font-medium text-muted-foreground mb-2">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="text-xs h-8">
              <TrendingUp className="h-3 w-3 mr-1" />
              Popular
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-8">
              <CheckCircle className="h-3 w-3 mr-1" />
              Free Only
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};