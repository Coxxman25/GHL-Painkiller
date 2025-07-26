'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { Lightbulb, Target, AlertTriangle, Zap } from 'lucide-react';

export const CompanionModeInterface = ({ className = '' }) => {
  const [businessData, setBusinessData] = useState({
    businessName: '',
    niche: '',
    goals: '',
  });

  const [detectedBottlenecks] = useState([
    'Lead qualification process',
    'Follow-up automation',
    'Pipeline management',
  ]);

  const [suggestions] = useState([
    'Implement automated lead scoring',
    'Set up nurture sequences',
    'Create conversion tracking',
  ]);

  const handleInputChange = (field, value) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateApp = () => {
    console.log('Generating app with data:', businessData);
  };

  return (
    <div className={`w-80 relative glass-sidebar ${className}`}>
      {/* Subtle animated left border for the panel */}
      <AnimatedBorder 
        variant="mixed" 
        position={['left']}
        speed={0.4} 
        opacity={0.2}
        className="absolute inset-0 pointer-events-none"
      />
      
      <div className="p-4 space-y-4 h-full overflow-y-auto">
        {/* Business Information */}
        <Card variant="home" animatedBorder className="relative">
          <CardHeader className="pb-3">
            <CardTitle variant="home">Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="micro-hover">
              <Label htmlFor="businessName" className="text-xs font-medium">
                Business name
              </Label>
              <Input
                id="businessName"
                placeholder="Enter business name"
                value={businessData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="mt-1 focus-ring-home transition-all duration-200"
              />
            </div>
            
            <div className="micro-hover">
              <Label htmlFor="niche" className="text-xs font-medium">
                Niche
              </Label>
              <Input
                id="niche"
                placeholder="e.g., Real Estate, Fitness, SaaS"
                value={businessData.niche}
                onChange={(e) => handleInputChange('niche', e.target.value)}
                className="mt-1 focus-ring-home transition-all duration-200"
              />
            </div>
            
            <div className="micro-hover">
              <Label htmlFor="goals" className="text-xs font-medium">
                Goals
              </Label>
              <Textarea
                id="goals"
                placeholder="What are your main business goals?"
                value={businessData.goals}
                onChange={(e) => handleInputChange('goals', e.target.value)}
                className="mt-1 min-h-[60px] focus-ring-home transition-all duration-200"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Detected Bottlenecks */}
        <Card variant="settings" animatedBorder className="relative">
          <CardHeader className="pb-3">
            <CardTitle variant="settings" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500 float" />
              Detected bottlenecks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {detectedBottlenecks.map((bottleneck, index) => (
                <div key={index} className="flex items-center gap-2 micro-hover p-1 rounded transition-all duration-200">
                  <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 pulse-glow" />
                  <span className="text-xs text-muted-foreground">{bottleneck}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card variant="chats" animatedBorder className="relative">
          <CardHeader className="pb-3">
            <CardTitle variant="chats" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-500 float" />
              Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2 micro-hover p-1 rounded transition-all duration-200">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-1.5 pulse-glow" />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {suggestion}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generate App Button */}
        <Button 
          variant="gradient-builder"
          onClick={handleGenerateApp}
          className="w-full"
          disabled={!businessData.businessName || !businessData.niche}
        >
          <Zap className="h-4 w-4 mr-2" />
          Generate this as an app
        </Button>
      </div>
    </div>
  );
};