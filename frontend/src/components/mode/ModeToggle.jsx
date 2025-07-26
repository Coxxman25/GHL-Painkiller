'use client';

import React from 'react';
import { useMode } from '@/context/mode-context';
import { MessageCircle, Wrench } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const ModeToggle = ({ className = '' }) => {
  const { mode, toggleMode, isCompanionMode, isBuilderMode } = useMode();

  return (
    <TooltipProvider>
      <div className={`flex gap-2 ${className}`}>
        {/* Companion Mode Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              style={{ 
                '--gradient-from': '#06b6d4', 
                '--gradient-to': '#3b82f6' 
              }}
              className={`
                relative w-[50px] h-[50px] glass-card border border-white/20 rounded-full 
                flex items-center justify-center transition-all duration-500 
                hover:w-[140px] hover:shadow-lg group cursor-pointer micro-button
                ${isCompanionMode ? 'glow-primary' : ''}
              `}
              onClick={() => isBuilderMode && toggleMode()}
            >
              {/* Gradient background on hover or active */}
              <span className={`absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] transition-all duration-500 ${
                isCompanionMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
              
              {/* Blur glow effect */}
              <span className={`absolute top-[8px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[12px] -z-10 transition-all duration-500 ${
                isCompanionMode ? 'opacity-40' : 'opacity-0 group-hover:opacity-40'
              }`}></span>

              {/* Icon */}
              <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0"> 
                <MessageCircle className={`h-5 w-5 transition-colors duration-500 ${
                  isCompanionMode ? 'text-white' : 'text-foreground/70 group-hover:text-white'
                }`} />
              </span>

              {/* Title */}
              <span className="absolute text-white uppercase tracking-wide text-xs font-medium transition-all duration-500 scale-0 group-hover:scale-100 delay-150 z-10"> 
                Companion
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Switch to Companion Mode - AI-powered business insights</p>
          </TooltipContent>
        </Tooltip>

        {/* Builder Mode Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              style={{ 
                '--gradient-from': '#10b981', 
                '--gradient-to': '#059669' 
              }}
              className={`
                relative w-[50px] h-[50px] glass-card border border-white/20 rounded-full 
                flex items-center justify-center transition-all duration-500 
                hover:w-[140px] hover:shadow-lg group cursor-pointer micro-button
                ${isBuilderMode ? 'glow-primary' : ''}
              `}
              onClick={() => isCompanionMode && toggleMode()}
            >
              {/* Gradient background on hover or active */}
              <span className={`absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] transition-all duration-500 ${
                isBuilderMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
              
              {/* Blur glow effect */}
              <span className={`absolute top-[8px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[12px] -z-10 transition-all duration-500 ${
                isBuilderMode ? 'opacity-40' : 'opacity-0 group-hover:opacity-40'
              }`}></span>

              {/* Icon */}
              <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0"> 
                <Wrench className={`h-5 w-5 transition-colors duration-500 ${
                  isBuilderMode ? 'text-white' : 'text-foreground/70 group-hover:text-white'
                }`} />
              </span>

              {/* Title */}
              <span className="absolute text-white uppercase tracking-wide text-xs font-medium transition-all duration-500 scale-0 group-hover:scale-100 delay-150 z-10"> 
                Builder
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Switch to Builder Mode - Visual component builder</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};