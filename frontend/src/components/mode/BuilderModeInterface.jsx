'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { 
  Code, 
  Layers, 
  Play, 
  Download,
  FileText
} from 'lucide-react';

export const BuilderModeInterface = ({ className = '' }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [aiPrompt, setAiPrompt] = useState('');

  const components = [
    { id: 1, name: 'Header', type: 'Navigation' },
    { id: 2, name: 'Hero Section', type: 'Layout' },
    { id: 3, name: 'Contact Form', type: 'Form' },
    { id: 4, name: 'Footer', type: 'Layout' },
  ];

  const handleSubmitPrompt = () => {
    console.log('AI Prompt submitted:', aiPrompt);
    setAiPrompt('');
  };

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Top Section - Components and Properties/Code */}
      <div className="flex-1 flex min-h-0">
        {/* Left Panel - Components */}
        <div className="w-64 glass-sidebar relative">
          <AnimatedBorder 
            variant="builder" 
            position={['right']}
            speed={0.3} 
            opacity={0.2}
            className="absolute inset-0 pointer-events-none"
          />
          
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 gradient-text-builder">
              <Layers className="h-4 w-4 float" />
              Components
            </h3>
            <div className="space-y-2">
              {components.map((component) => (
                <AnimatedBorder
                  key={component.id}
                  variant="builder"
                  speed={0.2}
                  opacity={0.15}
                  className={`p-2 rounded-md border micro-card cursor-pointer transition-all duration-300 ${
                    selectedComponent?.id === component.id
                      ? 'bg-primary/10 border-primary glow-builder'
                      : 'hover:bg-muted/80 border-white/20 glass-card'
                  }`}
                  onClick={() => setSelectedComponent(component)}
                >
                  <div className="text-xs font-medium">{component.name}</div>
                  <Badge variant="secondary" className="text-xs mt-1 micro-hover">
                    {component.type}
                  </Badge>
                </AnimatedBorder>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Properties/Code */}
        <div className="flex-1 glass-sidebar relative">
          <AnimatedBorder 
            variant="chats" 
            position={['left']}
            speed={0.4} 
            opacity={0.2}
            className="absolute inset-0 pointer-events-none"
          />
          
          <Tabs defaultValue="properties" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 m-2 glass-card border-white/20">
              <TabsTrigger value="properties" className="micro-button">Properties</TabsTrigger>
              <TabsTrigger value="code" className="micro-button">Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="properties" className="flex-1 p-4 space-y-4">
              {selectedComponent ? (
                <Card variant="chats" animatedBorder>
                  <CardHeader>
                    <CardTitle variant="chats">
                      {selectedComponent.name} Properties
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="micro-hover p-2 rounded transition-all duration-200">
                      <label className="text-xs font-medium">Width</label>
                      <div className="mt-1 text-xs text-muted-foreground">100%</div>
                    </div>
                    <div className="micro-hover p-2 rounded transition-all duration-200">
                      <label className="text-xs font-medium">Height</label>
                      <div className="mt-1 text-xs text-muted-foreground">auto</div>
                    </div>
                    <div className="micro-hover p-2 rounded transition-all duration-200">
                      <label className="text-xs font-medium">Background</label>
                      <div className="mt-1 text-xs text-muted-foreground">#ffffff</div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center text-muted-foreground text-sm glass-card p-8 border-white/20 micro-card">
                  Select a component to view properties
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="code" className="flex-1 p-4">
              <div className="h-full glass-card border-white/20 rounded-md p-3 text-green-400 font-mono text-xs micro-card">
                <div className="mb-2 text-gray-500">// HTML code</div>
                {selectedComponent ? (
                  <div className="shimmer">
                    &lt;div className="{selectedComponent.type.toLowerCase()}"&gt;<br/>
                    &nbsp;&nbsp;{selectedComponent.name}<br/>
                    &lt;/div&gt;
                  </div>
                ) : (
                  <div className="text-gray-500">Select a component to view code</div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bottom Section - AI Prompt */}
      <div className="glass-header p-4 relative">
        <AnimatedBorder 
          variant="help" 
          position={['top']}
          speed={0.3} 
          opacity={0.2}
          className="absolute inset-0 pointer-events-none"
        />
        
        <div className="flex items-center gap-2 mb-2">
          <Code className="h-4 w-4 float" />
          <span className="text-sm font-medium gradient-text-help">AI Prompt</span>
        </div>
        <div className="flex gap-2">
          <Textarea
            placeholder="E.g. Create an automation for emailing new leads"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="flex-1 min-h-[40px] focus-ring-help glass-card border-white/20 transition-all duration-200"
            rows={2}
          />
          <Button 
            variant="gradient-help"
            onClick={handleSubmitPrompt}
            disabled={!aiPrompt.trim()}
            className="px-6"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};