/**
 * 🎨 Aurora Design System - Design Tokens
 * 
 * Neon Glassmorphism Theme with Dark Mode Default
 * These tokens define the visual foundation of the application.
 */

export const auroraTheme = {
  // Color System - Dark Mode Primary
  colors: {
    // Aurora Core Colors (Neon Accents)
    aurora: {
      primary: '#00D4FF',    // Cyan neon
      secondary: '#FF0080',  // Magenta neon  
      tertiary: '#00FF88',   // Green neon
      quaternary: '#FFD700', // Gold neon
      accent: '#8B5CF6',     // Purple neon
    },

    // Dark Background System
    background: {
      primary: '#0A0A0F',     // Deep dark
      secondary: '#111118',   // Slightly lighter
      tertiary: '#1A1A24',    // Card backgrounds
      glass: 'rgba(255, 255, 255, 0.05)', // Glass overlay
      glassBorder: 'rgba(255, 255, 255, 0.1)', // Glass borders
    },

    // Surface Colors (Glassmorphism)
    surface: {
      primary: 'rgba(255, 255, 255, 0.03)',
      secondary: 'rgba(255, 255, 255, 0.05)',
      tertiary: 'rgba(255, 255, 255, 0.08)',
      hover: 'rgba(255, 255, 255, 0.1)',
      active: 'rgba(255, 255, 255, 0.15)',
      glass: 'rgba(255, 255, 255, 0.02)',
    },

    // Text Colors
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      tertiary: 'rgba(255, 255, 255, 0.5)',
      muted: 'rgba(255, 255, 255, 0.3)',
      accent: '#00D4FF',
    },

    // Border Colors
    border: {
      primary: 'rgba(255, 255, 255, 0.1)',
      secondary: 'rgba(255, 255, 255, 0.05)',
      accent: 'rgba(0, 212, 255, 0.3)',
      glow: 'rgba(0, 212, 255, 0.5)',
    },

    // Status Colors (Neon)
    status: {
      success: '#00FF88',
      warning: '#FFD700',
      error: '#FF0080',
      info: '#00D4FF',
    },

    // Light Mode Overrides (for theme switching)
    light: {
      background: {
        primary: '#FFFFFF',
        secondary: '#F8FAFC',
        tertiary: '#F1F5F9',
        glass: 'rgba(0, 0, 0, 0.05)',
        glassBorder: 'rgba(0, 0, 0, 0.1)',
      },
      text: {
        primary: '#0F172A',
        secondary: 'rgba(15, 23, 42, 0.7)',
        tertiary: 'rgba(15, 23, 42, 0.5)',
        muted: 'rgba(15, 23, 42, 0.3)',
      },
      surface: {
        primary: 'rgba(0, 0, 0, 0.03)',
        secondary: 'rgba(0, 0, 0, 0.05)',
        tertiary: 'rgba(0, 0, 0, 0.08)',
        hover: 'rgba(0, 0, 0, 0.1)',
        active: 'rgba(0, 0, 0, 0.15)',
      },
      border: {
        primary: 'rgba(0, 0, 0, 0.1)',
        secondary: 'rgba(0, 0, 0, 0.05)',
      },
    }
  },
  
  // Spacing System
  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },
  
  // Typography System
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      display: ['Inter', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    container: '1rem', // 16px
    element: '0.75rem', // 12px
    pill: '9999px',
  },
  
  // Effects (Glassmorphism & Neon)
  effects: {
    backdropBlur: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      '2xl': '24px',
      glass: '12px',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      glow: '0 0 20px rgba(0, 212, 255, 0.3)',
      glowHover: '0 0 30px rgba(0, 212, 255, 0.5)',
      elevated: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      neonGlow: '0 0 20px currentColor',
    },
    gradient: {
      aurora: 'linear-gradient(135deg, #00D4FF 0%, #FF0080 50%, #00FF88 100%)',
      neon: 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 100%)',
      glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      background: 'linear-gradient(135deg, #0A0A0F 0%, #111118 50%, #1A1A24 100%)',
    },
  },
  
  // Transitions
  transition: {
    fast: '150ms ease-out',
    normal: '250ms ease-out',
    slow: '350ms ease-out',
    spring: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Animation Keyframes
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    slideUp: {
      '0%': { transform: 'translateY(20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideDown: {
      '0%': { transform: 'translateY(-20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideLeft: {
      '0%': { transform: 'translateX(20px)', opacity: '0' },
      '100%': { transform: 'translateX(0)', opacity: '1' },
    },
    slideRight: {
      '0%': { transform: 'translateX(-20px)', opacity: '0' },
      '100%': { transform: 'translateX(0)', opacity: '1' },
    },
    glow: {
      '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
      '50%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)' },
    },
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' },
    },
    scale: {
      '0%': { transform: 'scale(0.95)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    neonPulse: {
      '0%, 100%': { 
        textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
        filter: 'brightness(1)'
      },
      '50%': { 
        textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
        filter: 'brightness(1.2)'
      },
    },
  },
};

export default auroraTheme;