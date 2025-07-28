# 🏗️ Spark Stack Frontend Architecture

## 📁 Modular Folder Structure

```
src/
├── 🎨 design-system/           # Aurora Design System
│   ├── tokens/                 # Design tokens & variables
│   ├── components/             # Base design system components
│   ├── animations/             # Framer Motion animations
│   ├── themes/                 # Theme configurations
│   └── utils/                  # Design system utilities
│
├── 🧩 components/              # Reusable UI Components
│   ├── ui/                     # shadcn/ui base components
│   ├── layout/                 # Layout components
│   ├── navigation/             # Navigation components
│   ├── forms/                  # Form components
│   ├── data-display/           # Data visualization
│   ├── feedback/               # Loading, alerts, toasts
│   └── interactive/            # Interactive elements
│
├── 🏠 modules/                 # Feature Modules
│   ├── auth/                   # Authentication module
│   ├── marketplace/            # Marketplace module
│   ├── builder/                # Automation builder
│   ├── chat/                   # AI companion chat
│   ├── automations/            # Automation management
│   └── settings/               # Settings module
│
├── 🔧 lib/                     # Utilities & Configurations
│   ├── api/                    # API clients & configurations
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Utility functions
│   ├── constants/              # Application constants
│   └── types/                  # TypeScript type definitions
│
├── 🎯 context/                 # React Context Providers
│   ├── theme-context.js        # Theme management
│   ├── user-context.js         # User state
│   ├── mode-context.js         # Application mode
│   └── automation-context.js   # Automation state
│
└── 📱 app/                     # Next.js App Router
    ├── (auth)/                 # Auth route group
    ├── (dashboard)/            # Dashboard route group
    ├── globals.css             # Global styles
    ├── layout.js               # Root layout
    └── page.js                 # Home page
```

## 🎨 Design System Principles

### Aurora Theme
- **Primary**: Aurora Green (#30C59D)
- **Secondary**: Accent Blue (#2F81F7)
- **Glassmorphism**: Backdrop blur effects
- **Animations**: Smooth micro-interactions

### Component Hierarchy
1. **Design System Components** - Base building blocks
2. **UI Components** - Composed from design system
3. **Feature Components** - Business logic components
4. **Page Components** - Full page compositions

## 🔄 Data Flow

```
User Interaction → Component → Hook → API → Backend → Database
                ↓
            Context/State → UI Update
```

## 📚 Documentation Standards

- Each module has its own README.md
- Components documented with JSDoc
- Storybook for component showcase
- Architecture decisions recorded in ADRs

## 🚀 Performance Optimization

- Code splitting by module
- Lazy loading for heavy components
- Optimized bundle sizes
- Progressive loading strategies