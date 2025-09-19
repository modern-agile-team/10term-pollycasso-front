import type { ReactNode } from 'react';
import clsx from 'clsx';

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
      className={clsx(
        'relative w-full rounded-xl border bg-white transition-all duration-200',
        isFocused
          ? 'ring-2 ring-[#419341] border-transparent'
          : 'ring-transparent',
        isError && 'border-red-500 ring-red-500',
        className,
      )}
    >
      {children}
    </div>
  );
};
