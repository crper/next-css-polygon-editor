import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'surface-button-primary',
        secondary:
          'border border-black/5 bg-slate-100 text-slate-900 hover:bg-slate-200 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
        outline: 'surface-button',
        ghost:
          'text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-xl px-3 text-xs',
        lg: 'h-11 rounded-xl px-6',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
