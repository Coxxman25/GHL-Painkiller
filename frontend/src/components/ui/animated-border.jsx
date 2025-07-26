'use client';

import React, { useEffect, useRef } from 'react';

// Brand gradient colors from navigation
const BRAND_COLORS = {
  home: { from: '#6366f1', to: '#8b5cf6' },
  chats: { from: '#06b6d4', to: '#3b82f6' },
  builder: { from: '#10b981', to: '#059669' },
  settings: { from: '#f59e0b', to: '#d97706' },
  help: { from: '#ec4899', to: '#be185d' },
};

export const AnimatedBorder = ({ 
  children, 
  variant = 'default',
  position = 'all',
  speed = 0.3,
  opacity = 0.3,
  className = '',
  ...props 
}) => {
  const borderRef = useRef(null);
  
  useEffect(() => {
    if (!borderRef.current) return;
    
    const animateBorder = () => {
      // Double check that the ref is still valid
      if (!borderRef.current) return;
      
      const now = Date.now() / 1000;
      
      // Get colors based on variant
      let colors = [];
      if (variant === 'mixed') {
        colors = Object.values(BRAND_COLORS);
      } else if (BRAND_COLORS[variant]) {
        colors = [BRAND_COLORS[variant]];
      } else {
        // Default primary color
        colors = [{ from: '#06b6d4', to: '#3b82f6' }];
      }
      
      // Calculate positions for multiple gradient spots
      const spots = colors.map((_, index) => {
        const offset = (index * 0.4) % 1;
        const progress = (Math.sin(now * speed + offset * Math.PI * 2) + 1) / 2;
        return progress * 100;
      });
      
      // Safe query with null check
      const borders = borderRef.current?.querySelectorAll('.animated-border-line');
      if (!borders || borders.length === 0) return;
      
      borders.forEach((border, borderIndex) => {
        const isVertical = border.classList.contains('vertical');
        let gradientStops = ['transparent 0%'];
        
        spots.forEach((spot, index) => {
          const color = colors[index % colors.length];
          const opacityHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
          gradientStops.push(
            `transparent ${Math.max(0, spot - 8)}%`,
            `${color.from}${opacityHex} ${spot}%`,
            `${color.to}${Math.round(opacity * 1.5 * 255).toString(16).padStart(2, '0')} ${spot + 8}%`,
            `transparent ${Math.min(100, spot + 16)}%`
          );
        });
        
        gradientStops.push('transparent 100%');
        
        if (isVertical) {
          border.style.background = `linear-gradient(to bottom, ${gradientStops.join(', ')})`;
        } else {
          border.style.background = `linear-gradient(to right, ${gradientStops.join(', ')})`;
        }
      });
      
      requestAnimationFrame(animateBorder);
    };
    
    const animationId = requestAnimationFrame(animateBorder);
    return () => cancelAnimationFrame(animationId);
  }, [variant, speed, opacity]);
  
  const renderBorders = () => {
    const borders = [];
    
    if (position === 'all' || position.includes('top')) {
      borders.push(
        <div key="top" className="animated-border-line absolute top-0 left-0 w-full h-px" />
      );
    }
    if (position === 'all' || position.includes('right')) {
      borders.push(
        <div key="right" className="animated-border-line vertical absolute right-0 top-0 w-px h-full" />
      );
    }
    if (position === 'all' || position.includes('bottom')) {
      borders.push(
        <div key="bottom" className="animated-border-line absolute bottom-0 left-0 w-full h-px" />
      );
    }
    if (position === 'all' || position.includes('left')) {
      borders.push(
        <div key="left" className="animated-border-line vertical absolute left-0 top-0 w-px h-full" />
      );
    }
    
    return borders;
  };
  
  return (
    <div 
      ref={borderRef}
      className={`relative ${className}`}
      {...props}
    >
      {renderBorders()}
      {children}
    </div>
  );
};

// Convenience components for specific brand colors
export const AnimatedBorderHome = (props) => <AnimatedBorder variant="home" {...props} />;
export const AnimatedBorderChats = (props) => <AnimatedBorder variant="chats" {...props} />;
export const AnimatedBorderBuilder = (props) => <AnimatedBorder variant="builder" {...props} />;
export const AnimatedBorderSettings = (props) => <AnimatedBorder variant="settings" {...props} />;
export const AnimatedBorderHelp = (props) => <AnimatedBorder variant="help" {...props} />;
export const AnimatedBorderMixed = (props) => <AnimatedBorder variant="mixed" {...props} />;