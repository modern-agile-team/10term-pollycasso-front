// src/shared/ui/Button.tsx

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

// cva 대신 사용할 타입과 스타일 객체
type ButtonVariant = 'primary' | 'kakao' | 'google' | 'destructive';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#003D00] text-white hover:bg-green-600',
  kakao: 'bg-[#FEE500] text-black hover:bg-[#FEE500]/90',
  google: 'bg-white text-black hover:bg-gray-100',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
};

export const Button = ({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex h-14 items-center justify-center rounded-md px-4 py-4 text-lg font-pretendard transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
