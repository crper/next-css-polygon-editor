import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type = 'text', ...props }: React.ComponentProps<'input'>) {
  return <input type={type} className={cn('surface-input', className)} {...props} />;
}

export { Input };
