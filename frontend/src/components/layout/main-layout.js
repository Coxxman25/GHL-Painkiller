'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AppLayout } from './enhanced-layout';
import { AuroraSidebar } from '../navigation/aurora-sidebar';
import { GradientNavigation } from '@/components/GradientNavigation';

// Pages that use AppShell directly and don't need the old layout
const APP_SHELL_PAGES = [
  '/marketplace',
  '/builder',
];

export const MainLayout = ({ children }) => {
  const pathname = usePathname();
  
  // If the page uses AppShell directly, just render children
  const usesAppShell = APP_SHELL_PAGES.some(page => 
    pathname.startsWith(page)
  );
  
  if (usesAppShell) {
    return children;
  }
  
  // For other pages, use the old layout
  return (
    <AppLayout
      sidebar={<AuroraSidebar />}
      header={<GradientNavigation />}
    >
      {children}
    </AppLayout>
  );
};
