import * as React from 'react';

import { cn } from '@/lib/utils';

function Badge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'surface-chip inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium',
        className
      )}
      {...props}
    />
  );
}

export { Badge };
