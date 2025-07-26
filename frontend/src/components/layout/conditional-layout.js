'use client';

import { usePathname } from 'next/navigation';
import { useUser } from '@/context/user-context';
import { MainLayout } from './main-layout';

// Pages that should NOT have the MainLayout (standalone pages)
const STANDALONE_PAGES = [
  '/auth',
  '/email-login',
  '/invite',
];

// Pages that should have MainLayout (when user is authenticated)
const LAYOUT_PAGES = [
  '/chats',
  '/settings',
  '/builder',
  '/help',
];

export function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const { user } = useUser();
  
  // Check if current page is a standalone page
  const isStandalonePage = STANDALONE_PAGES.some(page => 
    pathname.startsWith(page)
  );
  
  // Check if current page should have layout
  const shouldHaveLayout = LAYOUT_PAGES.some(page => 
    pathname.startsWith(page)
  );
  
  // If it's a standalone page, render without layout
  if (isStandalonePage) {
    return children;
  }
  
  // If user is not authenticated, don't apply layout
  if (!user) {
    return children;
  }
  
  // If it should have layout and user is authenticated, use MainLayout
  if (shouldHaveLayout) {
    return <MainLayout>{children}</MainLayout>;
  }
  
  // Default to no layout for unknown pages or unauthenticated users
  return children;
}