'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { 
  Bot, 
  MessageSquare, 
  Lightbulb, 
  Zap,
  ArrowRight,
  HelpCircle,
  BookOpen,
  Video
} from 'lucide-react';

const quickActions = [
  {
    title: 'Setup Lead Capture',
    description: 'Get help setting up forms and lead magnets',
    icon: <Zap className="h-5 w-5" />,
    category: 'Lead Generation'
  },
  {
    title: 'Create Follow-up Sequence',
    description: 'Build automated follow-up workflows',
    icon: <MessageSquare className="h-5 w-5" />,
    category: 'Automation'
  },
  {
    title: 'Optimize Conversions',
    description: 'Improve your funnel performance',
    icon: <Lightbulb className="h-5 w-5" />,
    category: 'Optimization'
  }
];

const helpResources = [
  {
    title: 'Getting Started Guide',
    description: 'Learn the basics of TriggerStack',
    icon: <BookOpen className="h-4 w-4" />,
    type: 'Guide'
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video walkthroughs',
    icon: <Video className="h-4 w-4" />,
    type: 'Video'
  },
  {
    title: 'FAQ',
    description: 'Frequently asked questions',
    icon: <HelpCircle className="h-4 w-4" />,
    type: 'FAQ'
  }
];

export default function AssistantPage() {
  return (
    <div className="h-full flex">
      {/* Left Panel - Quick Actions */}
      <div className="w-80 glass-sidebar relative">
        <AnimatedBorder 
          variant="chats" 
          position={['right']}
          speed={0.3} 
          opacity={0.2}
          className="absolute inset-0 pointer-events-none"
        />
        
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 gradient-text-chats">
            <Zap className="h-4 w-4 float" />
            Quick Actions
          </h3>
          
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Card key={index} variant="chats" animatedBorder className="cursor-pointer micro-hover">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="text-primary mt-0.5">
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium mb-1">{action.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{action.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {action.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 gradient-text-help">
              <HelpCircle className="h-4 w-4 float" />
              Help Resources
            </h3>
            
            <div className="space-y-2">
              {helpResources.map((resource, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer micro-hover">
                  <div className="text-muted-foreground">
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{resource.title}</div>
                    <div className="text-xs text-muted-foreground">{resource.description}</div>
                  </div>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="glass-header p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold gradient-text-chats">AI Setup Assistant</h2>
              <p className="text-sm text-muted-foreground">
                Get personalized help with your GHL automations
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Welcome Message */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <Card variant="chats" animatedBorder className="flex-1">
                <CardContent className="p-4">
                  <p className="text-sm mb-3">
                    👋 Welcome to TriggerStack! I'm your AI assistant, here to help you set up powerful automations for your GHL account.
                  </p>
                  <p className="text-sm mb-3">
                    I can help you with:
                  </p>
                  <ul className="text-sm space-y-1 mb-3 ml-4">
                    <li>• Setting up lead capture forms and automations</li>
                    <li>• Creating follow-up sequences and nurture campaigns</li>
                    <li>• Optimizing your funnels for better conversions</li>
                    <li>• Troubleshooting existing automations</li>
                  </ul>
                  <p className="text-sm">
                    What would you like to work on today?
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Suggested Questions */}
            <div className="flex flex-wrap gap-2 ml-11">
              <Button variant="outline" size="sm" className="text-xs">
                How do I set up a lead magnet?
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Create a follow-up sequence
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Optimize my conversion rates
              </Button>
            </div>
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="glass-header p-4 border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Ask me anything about GHL automations..."
                  className="w-full px-4 py-3 rounded-lg glass-card border border-white/20 focus-ring-chats transition-all duration-200 text-sm"
                />
              </div>
              <Button variant="gradient-chats" className="px-6">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}