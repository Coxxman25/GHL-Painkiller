# Aurora Design System

The Aurora Design System is a comprehensive, modular design system built for modern web applications. It features glassmorphism effects, smooth animations, and a cohesive visual language.

## 🎨 Design Principles

- **Glassmorphism**: Translucent surfaces with backdrop blur effects
- **Aurora Gradients**: Vibrant, multi-color gradients inspired by aurora borealis
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Accessibility First**: WCAG 2.1 AA compliant components
- **Dark Mode Native**: Built-in dark/light theme support

## 📁 Structure

```
design-system/
├── tokens/
│   └── design-tokens.js      # Core design tokens (colors, spacing, typography)
├── providers/
│   └── theme-provider.tsx    # Theme context and provider
├── components/
│   ├── glass.tsx            # Glass morphism components
│   └── typography.tsx       # Text and heading components
├── utils/
│   └── aurora-utils.js      # Design system utilities
└── index.js                 # Main exports
```

## 🚀 Quick Start

### 1. Import the Design System

```javascript
import { 
  ThemeProvider, 
  GlassCard, 
  AuroraHeading,
  designTokens 
} from '@/design-system'
```

### 2. Wrap Your App with ThemeProvider

```jsx
function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourAppContent />
    </ThemeProvider>
  )
}
```

### 3. Use Aurora Components

```jsx
function MyComponent() {
  return (
    <GlassCard 
      title="Welcome to Aurora"
      variant="elevated"
      glow
      animate
    >
      <AuroraHeading level={2} gradient>
        Beautiful Design System
      </AuroraHeading>
    </GlassCard>
  )
}
```

## 🎯 Core Components

### Glass Components

- **GlassPanel**: Base glassmorphism container
- **GlassCard**: Enhanced panel with header/footer support
- **GlassButton**: Interactive button with glass effects

### Typography

- **AuroraText**: Flexible text component with variants
- **AuroraHeading**: Semantic headings with gradient support
- **AuroraBadge**: Status and category badges
- **AuroraCode**: Code display with syntax highlighting

## 🎨 Design Tokens

### Colors

```javascript
// Aurora Core Colors
aurora: {
  primary: '#8B5CF6',    // Purple
  secondary: '#A855F7',  // Violet  
  tertiary: '#EC4899'    // Pink
}

// Surface Colors (Glassmorphism)
surface: {
  glass: 'rgba(255, 255, 255, 0.1)',
  elevated: 'rgba(255, 255, 255, 0.95)'
}
```

### Typography

```javascript
typography: {
  fontFamilies: {
    sans: ['Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace']
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem', 
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem'
  }
}
```

### Spacing & Layout

```javascript
spacing: {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem'
}
```

## 🎭 Theme System

The Aurora Design System includes a robust theme system with automatic dark mode support:

```jsx
import { useTheme } from '@/design-system'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  )
}
```

## 🎬 Animations

Built-in animations using Framer Motion:

```jsx
// Automatic animations
<GlassCard animate>
  Content with fade-in animation
</GlassCard>

// Custom animations using utilities
import { animations } from '@/design-system'

const customVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
}
```

## 🛠 Utilities

### Glass Effects

```javascript
import { createGlassEffect } from '@/design-system'

const glassStyle = createGlassEffect(0.1, '20px')
// Returns: { backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }
```

### Responsive Breakpoints

```javascript
import { createBreakpoint } from '@/design-system'

const tabletUp = createBreakpoint('md')
// Returns: '@media (min-width: 768px)'
```

### Gradient Generation

```javascript
import { createGradient } from '@/design-system'

const auroraGradient = createGradient('#8B5CF6', '#EC4899', 'to right')
// Returns: 'linear-gradient(to right, #8B5CF6, #EC4899)'
```

## 📱 Responsive Design

The Aurora Design System is mobile-first and fully responsive:

```css
/* Breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

## ♿ Accessibility

All components follow WCAG 2.1 AA guidelines:

- Semantic HTML structure
- Proper ARIA attributes
- Keyboard navigation support
- High contrast ratios
- Screen reader compatibility

## 🎨 Customization

### Extending Colors

```javascript
// In your tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'aurora-custom': '#your-color',
      }
    }
  }
}
```

### Custom Components

```jsx
import { GlassPanel } from '@/design-system'

function CustomComponent() {
  return (
    <GlassPanel className="custom-styles">
      Your custom content
    </GlassPanel>
  )
}
```

## 🔧 Development

### Adding New Components

1. Create component in `components/` directory
2. Export from `index.js`
3. Add documentation
4. Write tests

### Design Token Updates

1. Update `tokens/design-tokens.js`
2. Regenerate CSS variables
3. Update documentation
4. Test across themes

## 📚 Examples

Check the `/examples` directory for complete implementation examples:

- Basic setup
- Custom theming
- Animation patterns
- Responsive layouts
- Accessibility features

## 🤝 Contributing

1. Follow the established patterns
2. Maintain accessibility standards
3. Add comprehensive documentation
4. Include usage examples
5. Test in both light and dark modes

---

Built with ❤️ for modern web applications