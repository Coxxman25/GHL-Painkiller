'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { 
  Layers, 
  Zap, 
  Plus,
  Trash2,
  Settings,
  ArrowRight,
  Workflow,
  Bot,
  Target
} from 'lucide-react';

// GHL Component types for mapping
const ghlComponents = [
  {
    id: 'trigger-form',
    name: 'Form Submission',
    type: 'Trigger',
    category: 'Lead Capture',
    description: 'Triggers when a contact submits a form',
    icon: <Target className="h-4 w-4" />
  },
  {
    id: 'trigger-call',
    name: 'Missed Call',
    type: 'Trigger', 
    category: 'Communication',
    description: 'Triggers when a call is missed',
    icon: <Target className="h-4 w-4" />
  },
  {
    id: 'action-sms',
    name: 'Send SMS',
    type: 'Action',
    category: 'Communication',
    description: 'Sends an SMS message to contact',
    icon: <Zap className="h-4 w-4" />
  },
  {
    id: 'action-email',
    name: 'Send Email',
    type: 'Action',
    category: 'Communication', 
    description: 'Sends an email to contact',
    icon: <Zap className="h-4 w-4" />
  },
  {
    id: 'action-tag',
    name: 'Add Tag',
    type: 'Action',
    category: 'Organization',
    description: 'Adds a tag to the contact',
    icon: <Zap className="h-4 w-4" />
  },
  {
    id: 'condition-tag',
    name: 'Has Tag',
    type: 'Condition',
    category: 'Logic',
    description: 'Checks if contact has specific tag',
    icon: <Settings className="h-4 w-4" />
  },
  {
    id: 'delay',
    name: 'Wait/Delay',
    type: 'Utility',
    category: 'Timing',
    description: 'Adds a delay before next action',
    icon: <Settings className="h-4 w-4" />
  }
];

const componentCategories = [
  'All Components',
  'Triggers', 
  'Actions',
  'Conditions',
  'Utilities'
];

export const ComponentMapperInterface = ({ className = '' }) => {
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Components');
  const [aiPrompt, setAiPrompt] = useState('');
  const [canvasComponents, setCanvasComponents] = useState([]);

  const filteredComponents = ghlComponents.filter(component => {
    if (selectedCategory === 'All Components') return true;
    if (selectedCategory === 'Triggers') return component.type === 'Trigger';
    if (selectedCategory === 'Actions') return component.type === 'Action';
    if (selectedCategory === 'Conditions') return component.type === 'Condition';
    if (selectedCategory === 'Utilities') return component.type === 'Utility';
    return true;
  });

  const handleComponentSelect = (component) => {
    setSelectedComponents(prev => {
      const isSelected = prev.find(c => c.id === component.id);
      if (isSelected) {
        return prev.filter(c => c.id !== component.id);
      } else {
        return [...prev, component];
      }
    });
  };

  const addToCanvas = (component) => {
    const newComponent = {
      ...component,
      canvasId: `canvas-${Date.now()}-${Math.random()}`,
      position: { x: Math.random() * 200, y: Math.random() * 100 }
    };
    setCanvasComponents(prev => [...prev, newComponent]);
  };

  const removeFromCanvas = (canvasId) => {
    setCanvasComponents(prev => prev.filter(c => c.canvasId !== canvasId));
  };

  const handleAIPrompt = () => {
    console.log('AI Prompt for automation:', aiPrompt);
    // TODO: Implement AI-powered automation generation
    setAiPrompt('');
  };

  const getTypeColor = (type) => {
    const colors = {
      'Trigger': 'text-green-500 bg-green-500/10 border-green-500/20',
      'Action': 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      'Condition': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
      'Utility': 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    };
    return colors[type] || 'text-gray-500 bg-gray-500/10 border-gray-500/20';
  };

  return (
    <div className={`h-full flex ${className}`}>
      {/* Left Panel - GHL Components */}
      <div className="w-80 glass-sidebar relative">
        <AnimatedBorder 
          variant="builder" 
          position={['right']}
          speed={0.3} 
          opacity={0.2}
          className="absolute inset-0 pointer-events-none"
        />
        
        <div className="p-4 h-full flex flex-col">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 gradient-text-builder">
            <Layers className="h-4 w-4 float" />
            GHL Components
          </h3>

          {/* Category Filter */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {componentCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Components List */}
          <div className="flex-1 space-y-2 overflow-y-auto">
            {filteredComponents.map((component) => (
              <Card
                key={component.id}
                variant="builder"
                className={`cursor-pointer transition-all duration-200 micro-hover ${
                  selectedComponents.find(c => c.id === component.id)
                    ? 'ring-2 ring-primary glow-builder'
                    : ''
                }`}
                onClick={() => handleComponentSelect(component)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {component.icon}
                      <span className="text-sm font-medium">{component.name}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCanvas(component);
                      }}
                      className="h-6 w-6 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Badge className={`text-xs mb-2 ${getTypeColor(component.type)}`}>
                    {component.type}
                  </Badge>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {component.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Center - Automation Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Canvas Header */}
        <div className="glass-header p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Workflow className="h-5 w-5 gradient-text-builder" />
              <h2 className="text-lg font-semibold gradient-text-builder">Automation Builder</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Save Draft
              </Button>
              <Button variant="gradient-builder" size="sm">
                Deploy Automation
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative bg-gradient-to-br from-background/50 to-muted/30 overflow-auto">
          {canvasComponents.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center glass-card border-white/20 p-8 rounded-lg max-w-md">
                <Workflow className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Drag components here to build your automation</h3>
                <p className="text-sm text-muted-foreground">
                  Start by adding triggers, actions, and conditions from the left panel
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {canvasComponents.map((component, index) => (
                <div key={component.canvasId} className="flex items-center gap-2">
                  <Card variant="builder" animatedBorder className="flex-1">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {component.icon}
                          <span className="font-medium">{component.name}</span>
                          <Badge className={`text-xs ${getTypeColor(component.type)}`}>
                            {component.type}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCanvas(component.canvasId)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {index < canvasComponents.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Prompt Section */}
        <div className="glass-header p-4 border-t border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="h-4 w-4 gradient-text-help" />
            <span className="text-sm font-medium gradient-text-help">AI Automation Assistant</span>
          </div>
          <div className="flex gap-2">
            <Textarea
              placeholder="Describe the automation you want to create... e.g., 'When someone fills out my contact form, send them a welcome email and add them to my nurture sequence'"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="flex-1 min-h-[60px] focus-ring-help glass-card border-white/20"
              rows={3}
            />
            <Button 
              variant="gradient-help"
              onClick={handleAIPrompt}
              disabled={!aiPrompt.trim()}
              className="px-6 self-end"
            >
              Generate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};