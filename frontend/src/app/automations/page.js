'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { 
  Search,
  Plus,
  Play,
  Pause,
  Edit,
  Trash2,
  BarChart3,
  Clock,
  Users,
  Zap,
  Filter,
  Download
} from 'lucide-react';

const sampleAutomations = [
  {
    id: 1,
    name: 'Welcome Email Sequence',
    description: 'Automated welcome series for new leads',
    status: 'active',
    triggers: 156,
    conversions: 23,
    lastRun: '2 hours ago',
    created: '2024-01-15',
    category: 'Nurture'
  },
  {
    id: 2,
    name: 'Missed Call Follow-up',
    description: 'SMS follow-up for missed calls',
    status: 'active',
    triggers: 89,
    conversions: 12,
    lastRun: '15 minutes ago',
    created: '2024-01-10',
    category: 'Follow-up'
  },
  {
    id: 3,
    name: 'Lead Scoring System',
    description: 'Automatic lead qualification and scoring',
    status: 'paused',
    triggers: 234,
    conversions: 45,
    lastRun: '1 day ago',
    created: '2024-01-05',
    category: 'Lead Generation'
  },
  {
    id: 4,
    name: 'Appointment Reminders',
    description: 'SMS and email reminders for appointments',
    status: 'draft',
    triggers: 0,
    conversions: 0,
    lastRun: 'Never',
    created: '2024-01-20',
    category: 'Follow-up'
  }
];

const statusColors = {
  active: 'text-green-500 bg-green-500/10 border-green-500/20',
  paused: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  draft: 'text-gray-500 bg-gray-500/10 border-gray-500/20'
};

export default function AutomationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAutomations = sampleAutomations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || automation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusToggle = (id, currentStatus) => {
    console.log(`Toggling automation ${id} from ${currentStatus}`);
    // TODO: Implement status toggle logic
  };

  const handleEdit = (id) => {
    console.log(`Editing automation ${id}`);
    // TODO: Navigate to builder with automation data
  };

  const handleDelete = (id) => {
    console.log(`Deleting automation ${id}`);
    // TODO: Implement delete logic
  };

  const handleExport = (id) => {
    console.log(`Exporting automation ${id}`);
    // TODO: Implement export logic
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="glass-header p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold gradient-text-settings">My Automations</h1>
            <p className="text-sm text-muted-foreground">
              Manage and monitor your automation workflows
            </p>
          </div>
          
          <Button variant="gradient-settings" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Automation
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search automations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 focus-ring-settings glass-card border-white/20"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={statusFilter === 'paused' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('paused')}
            >
              Paused
            </Button>
            <Button
              variant={statusFilter === 'draft' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('draft')}
            >
              Draft
            </Button>
          </div>
        </div>
      </div>

      {/* Automations List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {filteredAutomations.map((automation) => (
            <Card key={automation.id} variant="settings" animatedBorder className="group">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{automation.name}</h3>
                      <Badge className={`text-xs ${statusColors[automation.status]}`}>
                        {automation.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {automation.description}
                    </p>
                    
                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        <span>{automation.triggers} triggers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart3 className="h-3 w-3" />
                        <span>{automation.conversions} conversions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Last run: {automation.lastRun}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {automation.status === 'active' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusToggle(automation.id, automation.status)}
                        className="h-8 w-8 p-0"
                      >
                        <Pause className="h-3 w-3" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusToggle(automation.id, automation.status)}
                        className="h-8 w-8 p-0"
                      >
                        <Play className="h-3 w-3" />
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(automation.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleExport(automation.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(automation.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredAutomations.length === 0 && (
          <div className="text-center py-12">
            <div className="glass-card border-white/20 p-8 rounded-lg max-w-md mx-auto">
              <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No automations found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first automation to get started'
                }
              </p>
              {!searchQuery && statusFilter === 'all' && (
                <Button variant="gradient-settings">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Automation
                </Button>
              )}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}