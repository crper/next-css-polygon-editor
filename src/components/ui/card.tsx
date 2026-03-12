import * as React from 'react';

import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('surface-card', className)} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('text-sm text-slate-600 dark:text-slate-400', className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
