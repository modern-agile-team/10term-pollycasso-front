import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

interface FormFieldProps {
  isFocused: boolean;
  isError: boolean;
  children: ReactNode;
  className?: string;
}

export const FormField = ({
  isFocused,
  isError,
  children,
  className,
}: FormFieldProps) => {
  return (
    <div
      className={cn(
        'relative w-full rounded-xl border bg-white transition-all duration-200',
        {
          'ring-2 ring-[#419341] border-transparent': isFocused,
          'ring-transparent': !isFocused,
          'border-red-500 ring-red-500': isError,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};
