import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 micro-button hover:shadow-md animated-border',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 glow-primary',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 glow-accent',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground glass-card border-white/20',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 glass-card',
        ghost: 'hover:bg-accent hover:text-accent-foreground micro-hover',
        link: 'text-primary underline-offset-4 hover:underline gradient-text',
        
        // Brand Gradient Variants
        'gradient-home': 'bg-gradient-to-r from-[rgb(var(--brand-home-from))] to-[rgb(var(--brand-home-to))] text-white hover:shadow-lg glow-home animated-border-home glass-card border-white/20',
        'gradient-chats': 'bg-gradient-to-r from-[rgb(var(--brand-chats-from))] to-[rgb(var(--brand-chats-to))] text-white hover:shadow-lg glow-chats animated-border-chats glass-card border-white/20',
        'gradient-builder': 'bg-gradient-to-r from-[rgb(var(--brand-builder-from))] to-[rgb(var(--brand-builder-to))] text-white hover:shadow-lg glow-builder animated-border-builder glass-card border-white/20',
        'gradient-settings': 'bg-gradient-to-r from-[rgb(var(--brand-settings-from))] to-[rgb(var(--brand-settings-to))] text-white hover:shadow-lg glow-settings animated-border-settings glass-card border-white/20',
        'gradient-help': 'bg-gradient-to-r from-[rgb(var(--brand-help-from))] to-[rgb(var(--brand-help-to))] text-white hover:shadow-lg glow-help animated-border-help glass-card border-white/20',
        
        // Subtle Brand Variants (for less prominent buttons)
        'subtle-home': 'bg-[rgb(var(--brand-home-from)/0.1)] text-[rgb(var(--brand-home-from))] border border-[rgb(var(--brand-home-from)/0.3)] hover:bg-[rgb(var(--brand-home-from)/0.2)] glass-card animated-border-home focus-ring-home',
        'subtle-chats': 'bg-[rgb(var(--brand-chats-from)/0.1)] text-[rgb(var(--brand-chats-from))] border border-[rgb(var(--brand-chats-from)/0.3)] hover:bg-[rgb(var(--brand-chats-from)/0.2)] glass-card animated-border-chats focus-ring-chats',
        'subtle-builder': 'bg-[rgb(var(--brand-builder-from)/0.1)] text-[rgb(var(--brand-builder-from))] border border-[rgb(var(--brand-builder-from)/0.3)] hover:bg-[rgb(var(--brand-builder-from)/0.2)] glass-card animated-border-builder focus-ring-builder',
        'subtle-settings': 'bg-[rgb(var(--brand-settings-from)/0.1)] text-[rgb(var(--brand-settings-from))] border border-[rgb(var(--brand-settings-from)/0.3)] hover:bg-[rgb(var(--brand-settings-from)/0.2)] glass-card animated-border-settings focus-ring-settings',
        'subtle-help': 'bg-[rgb(var(--brand-help-from)/0.1)] text-[rgb(var(--brand-help-from))] border border-[rgb(var(--brand-help-from)/0.3)] hover:bg-[rgb(var(--brand-help-from)/0.2)] glass-card animated-border-help focus-ring-help',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
