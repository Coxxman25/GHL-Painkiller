'use client';

import { useUser } from '@/context/user-context';

export default function WorkspaceLayout({ children }) {
  const { user } = useUser();

  if (!user) return null;

  return children;
}
