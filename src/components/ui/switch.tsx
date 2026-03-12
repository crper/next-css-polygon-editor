'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'peer inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-transparent bg-slate-300 p-1 shadow-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 dark:bg-slate-700 dark:data-[state=checked]:bg-blue-500',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-5 dark:bg-slate-950'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
