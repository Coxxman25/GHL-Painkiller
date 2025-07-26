'use client';

import React from 'react';
import { useMode } from '@/context/mode-context';
import { Chat } from './Chat';
import { CompanionModeInterface } from '@/components/mode/CompanionModeInterface';
import { BuilderModeInterface } from '@/components/mode/BuilderModeInterface';

export const ModeAwareChat = (props) => {
  const { isCompanionMode, isBuilderMode } = useMode();

  if (isCompanionMode) {
    return (
      <div className="flex h-full">
        {/* Chat Interface */}
        <div className="flex-1">
          <Chat {...props} />
        </div>
        {/* Companion Mode Side Panel */}
        <CompanionModeInterface />
      </div>
    );
  }

  if (isBuilderMode) {
    return (
      <div className="h-full">
        <BuilderModeInterface />
      </div>
    );
  }

  // Fallback to default chat
  return <Chat {...props} />;
};