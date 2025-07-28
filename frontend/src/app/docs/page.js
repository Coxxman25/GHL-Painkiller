'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { 
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Clock,
  Users,
  Star,
  ArrowRight
} from 'lucide-react';

const docCategories = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of TriggerStack',
    icon: <BookOpen className="h-5 w-5" />,
    articles: [
      { title: 'Quick Start Guide', time: '5 min read', difficulty: 'Beginner' },
      { title: 'Setting Up Your First Automation', time: '10 min read', difficulty: 'Beginner' },
      { title: 'Understanding Triggers and Actions', time: '8 min read', difficulty: 'Beginner' }
    ]
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video walkthroughs',
    icon: <Video className="h-5 w-5" />,
    articles: [
      { title: 'TriggerStack Overview', time: '12 min watch', difficulty: 'Beginner' },
      { title: 'Building Your First Automation', time: '18 min watch', difficulty: 'Beginner' },
      { title: 'Advanced Automation Strategies', time: '25 min watch', difficulty: 'Advanced' }
    ]
  },
  {
    title: 'Automation Guides',
    description: 'Detailed guides for specific use cases',
    icon: <FileText className="h-5 w-5" />,
    articles: [
      { title: 'Lead Capture Automations', time: '15 min read', difficulty: 'Intermediate' },
      { title: 'Follow-up Sequences', time: '12 min read', difficulty: 'Intermediate' },
      { title: 'E-commerce Automations', time: '20 min read', difficulty: 'Advanced' }
    ]
  }
];

const popularArticles = [
  {
    title: 'How to Set Up Lead Scoring',
    category: 'Automation Guides',
    views: 2340,
    rating: 4.8,
    time: '15 min read'
  },
  {
    title: 'Best Practices for SMS Automation',
    category: 'Best Practices',
    views: 1890,
    rating: 4.9,
    time: '10 min read'
  },
  {
    title: 'Troubleshooting Common Issues',
    category: 'Support',
    views: 1560,
    rating: 4.7,
    time: '8 min read'
  }
];

const getDifficultyColor = (difficulty) => {
  const colors = {
    'Beginner': 'text-green-500 bg-green-500/10 border-green-500/20',
    'Intermediate': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    'Advanced': 'text-red-500 bg-red-500/10 border-red-500/20'
  };
  return colors[difficulty] || 'text-gray-500 bg-gray-500/10 border-gray-500/20';
};

export default function DocsPage() {
  return (
    <div className="h-full flex">
      {/* Left Sidebar - Navigation */}
      <div className="w-80 glass-sidebar relative">
        <AnimatedBorder 
          variant="help" 
          position={['right']}
          speed={0.3} 
          opacity={0.2}
          className="absolute inset-0 pointer-events-none"
        />
        
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 gradient-text-help">
            <BookOpen className="h-4 w-4 float" />
            Documentation
          </h3>
          
          <div className="space-y-4">
            {docCategories.map((category, index) => (
              <Card key={index} variant="help" className="cursor-pointer micro-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    {category.icon}
                    {category.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    {category.articles.map((article, articleIndex) => (
                      <div key={articleIndex} className="flex items-center justify-between p-1 rounded hover:bg-muted/50 cursor-pointer">
                        <span className="text-xs">{article.title}</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="glass-header p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold gradient-text-help">Documentation</h1>
              <p className="text-sm text-muted-foreground">
                Learn how to build powerful automations with TriggerStack
              </p>
            </div>
            
            <Button variant="outline" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Visit Help Center
            </Button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Popular Articles */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Popular Articles
              </h2>
              
              <div className="grid gap-4">
                {popularArticles.map((article, index) => (
                  <Card key={index} variant="help" animatedBorder className="cursor-pointer group hover:scale-[1.01] transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                            <Badge variant="outline" className="text-xs">
                              {article.category}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {article.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {article.views} views
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {article.rating}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Categories */}
            <div>
              <h2 className="text-lg font-semibold mb-4">All Categories</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {docCategories.map((category, index) => (
                  <Card key={index} variant="help" animatedBorder className="cursor-pointer group hover:scale-[1.02] transition-all duration-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                        {category.icon}
                        {category.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {category.articles.map((article, articleIndex) => (
                          <div key={articleIndex} className="flex items-center justify-between text-sm">
                            <span className="flex-1 truncate">{article.title}</span>
                            <div className="flex items-center gap-2 ml-2">
                              <Badge className={`text-xs ${getDifficultyColor(article.difficulty)}`}>
                                {article.difficulty}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}