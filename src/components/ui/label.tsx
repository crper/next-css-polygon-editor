import * as React from 'react';

import { cn } from '@/lib/utils';

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      className={cn('mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400', className)}
      {...props}
    />
  );
}

export { Label };
