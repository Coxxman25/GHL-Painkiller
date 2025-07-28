'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { Star, Download, Zap, Users, Clock } from 'lucide-react';

export const SnippetCard = ({ 
  snippet,
  variant = 'default',
  onDeploy,
  className = ''
}) => {
  const {
    id,
    title,
    description,
    category,
    rating = 4.5,
    downloads = 0,
    difficulty = 'Beginner',
    estimatedTime = '5 min',
    tags = [],
    isNew = false,
    isPro = false
  } = snippet;

  const getCategoryVariant = (category) => {
    const variants = {
      'Lead Generation': 'home',
      'Follow-up': 'chats', 
      'Nurture': 'builder',
      'Conversion': 'settings',
      'Analytics': 'help'
    };
    return variants[category] || 'default';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'text-green-500',
      'Intermediate': 'text-yellow-500', 
      'Advanced': 'text-red-500'
    };
    return colors[difficulty] || 'text-gray-500';
  };

  return (
    <Card 
      variant={getCategoryVariant(category)} 
      animatedBorder 
      className={`relative group hover:scale-[1.02] transition-all duration-300 cursor-pointer ${className}`}
    >
      {/* New/Pro badges */}
      <div className="absolute top-3 right-3 flex gap-1 z-10">
        {isNew && (
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
            NEW
          </Badge>
        )}
        {isPro && (
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
            PRO
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle variant={getCategoryVariant(category)} className="text-sm font-semibold mb-1 line-clamp-2">
              {title}
            </CardTitle>
            <Badge variant="outline" className="text-xs mb-2 glass-card border-white/20">
              {category}
            </Badge>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
          {description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Rating and Stats */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground">({Math.floor(rating * 100)})</span>
          </div>
          
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              <span>{downloads > 1000 ? `${Math.floor(downloads/1000)}k` : downloads}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{estimatedTime}</span>
            </div>
          </div>
        </div>

        {/* Difficulty */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className={`text-xs font-medium ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2 py-0.5 glass-card border-white/10"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5 glass-card border-white/10">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Deploy Button */}
        <Button 
          variant={`gradient-${getCategoryVariant(category)}`}
          size="sm"
          onClick={() => onDeploy?.(snippet)}
          className="w-full mt-3 group-hover:shadow-lg transition-all duration-300"
        >
          <Zap className="h-3 w-3 mr-1" />
          Deploy to GHL
        </Button>
      </CardContent>
    </Card>
  );
};