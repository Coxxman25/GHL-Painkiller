'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HoverChatInterface } from '@/components/builder/HoverChatInterface';
import { 
  Zap, 
  Settings, 
  Play, 
  Download,
  Search,
  Plus,
  MessageSquare,
  Mail,
  Phone,
  Users,
  Target,
  Database,
  Clock,
  Grip,
  MousePointer2
} from 'lucide-react';

export const BuilderModeInterface = ({ className = '' }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [draggedComponent, setDraggedComponent] = useState(null);

  // Simple component library
  const components = [
    { 
      id: 'email', 
      name: 'Email', 
      icon: <Mail className="h-4 w-4" />,
      description: 'Send email messages',
      category: 'Messages'
    },
    { 
      id: 'sms', 
      name: 'SMS', 
      icon: <Phone className="h-4 w-4" />,
      description: 'Send SMS messages',
      category: 'Messages'
    },
    { 
      id: 'in-app', 
      name: 'In-App Message', 
      icon: <MessageSquare className="h-4 w-4" />,
      description: 'Send in-app notifications',
      category: 'Messages'
    },
    { 
      id: 'create-contact', 
      name: 'Create Contact', 
      icon: <Users className="h-4 w-4" />,
      description: 'Create new contact',
      category: 'Data'
    },
    { 
      id: 'update-data', 
      name: 'Update Data', 
      icon: <Database className="h-4 w-4" />,
      description: 'Update contact data',
      category: 'Data'
    },
    { 
      id: 'delay', 
      name: 'Delay', 
      icon: <Clock className="h-4 w-4" />,
      description: 'Add time delay',
      category: 'Flow'
    }
  ];

  const handleDragStart = (e, component) => {
    setDraggedComponent(component);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedComponent) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newComponent = {
        ...draggedComponent,
        canvasId: `canvas-${Date.now()}`,
        position: { x: x - 100, y: y - 50 }
      };
      setCanvasComponents(prev => [...prev, newComponent]);
      setDraggedComponent(null);
    }
  };

  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedComponents = filteredComponents.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {});

  return (
    <div className={`h-full bg-gray-50 relative ${className}`}>
      {/* Hover Chat Interface */}
      <HoverChatInterface />
      
      <div className="h-full flex">
        {/* Left Panel - Component Library */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col ml-16">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Components</h2>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Component List */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {categoryComponents.map((component) => (
                      <div
                        key={component.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-grab active:cursor-grabbing transition-all duration-150"
                        draggable
                        onDragStart={(e) => handleDragStart(e, component)}
                        onClick={() => setSelectedComponent(component)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                          {component.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{component.name}</div>
                          <div className="text-sm text-gray-500">{component.description}</div>
                        </div>
                        <Grip className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Center Panel - Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Automation Canvas</h2>
                <p className="text-sm text-gray-500">Drag components here to build your automation</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Test
                </Button>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div 
            className="flex-1 relative bg-gray-50 overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {canvasComponents.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building</h3>
                  <p className="text-gray-500 max-w-sm">
                    Drag components from the left panel to start creating your automation workflow
                  </p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 p-4">
                {canvasComponents.map((component) => (
                  <Card
                    key={component.canvasId}
                    className="absolute w-48 cursor-move shadow-lg"
                    style={{
                      left: component.position.x,
                      top: component.position.y
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                          {component.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{component.name}</div>
                          <div className="text-sm text-gray-500">{component.category}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
          </div>
          
          <div className="flex-1 p-4">
            {selectedComponent ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Component Name
                  </label>
                  <Input value={selectedComponent.name} readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Input value={selectedComponent.description} readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <Input value={selectedComponent.category} readOnly />
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MousePointer2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a component to view its properties</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};