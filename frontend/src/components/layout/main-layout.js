'use client';

import React from 'react';
import { Sidebar } from './sidebar';
import { GradientNavigation } from '@/components/GradientNavigation';

export const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      {/* Top Gradient Navigation - Fixed height */}
      <div className="flex-shrink-0">
        <GradientNavigation />
      </div>
      
      {/* Main content area with proper spacing */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 min-w-0">
          <div className="h-full max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
