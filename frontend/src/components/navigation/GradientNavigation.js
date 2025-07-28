'use client';

import React, { useState } from 'react';
import { 
  IoStorefrontOutline, 
  IoChatbubbleOutline, 
  IoLayersOutline, 
  IoFolderOutline, 
  IoBookOutline 
} from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '@/components/mode/ModeToggle';

const menuItems = [
  { 
    title: 'Marketplace', 
    icon: <IoStorefrontOutline />, 
    gradientFrom: '#6366f1', 
    gradientTo: '#8b5cf6',
    href: '/marketplace'
  },
  { 
    title: 'AI Assistant', 
    icon: <IoChatbubbleOutline />, 
    gradientFrom: '#06b6d4', 
    gradientTo: '#3b82f6',
    href: '/assistant'
  },
  { 
    title: 'Builder', 
    icon: <IoLayersOutline />, 
    gradientFrom: '#10b981', 
    gradientTo: '#059669',
    href: '/builder'
  },
  { 
    title: 'My Automations', 
    icon: <IoFolderOutline />, 
    gradientFrom: '#f59e0b', 
    gradientTo: '#d97706',
    href: '/automations'
  },
  { 
    title: 'Docs', 
    icon: <IoBookOutline />, 
    gradientFrom: '#ec4899', 
    gradientTo: '#be185d',
    href: '/docs'
  }
];

export function GradientNavigation() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(0);

  const handleNavigation = (href, index) => {
    setActiveItem(index);
    router.push(href);
  };

  return (
    <div className="glass-header border-b border-white/10 p-4">
      <div className="flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold gradient-text">TriggerStack</h1>
        </div>

        {/* Gradient Navigation Menu */}
        <div className="flex items-center justify-center flex-1">
          <ul className="flex gap-4">
            {menuItems.map(({ title, icon, gradientFrom, gradientTo, href }, idx) => (
              <li 
                key={idx}
                style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo }}
                className={`
                  relative w-[50px] h-[50px] glass-card border border-white/20 rounded-full 
                  flex items-center justify-center transition-all duration-500 
                  hover:w-[140px] hover:shadow-lg group cursor-pointer micro-button
                  ${activeItem === idx ? 'glow-primary' : ''}
                `}
                onClick={() => handleNavigation(href, idx)}
              >
                {/* Gradient background on hover */}
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
                
                {/* Blur glow effect */}
                <span className="absolute top-[8px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[12px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-40"></span>

                {/* Icon */}
                <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0"> 
                  <span className="text-xl text-foreground/70 group-hover:text-white">{icon}</span>
                </span>

                {/* Title */}
                <span className="absolute text-white uppercase tracking-wide text-xs font-medium transition-all duration-500 scale-0 group-hover:scale-100 delay-150 z-10"> 
                  {title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side - Mode Toggle */}
        <div className="flex items-center">
          <div className="micro-button">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}