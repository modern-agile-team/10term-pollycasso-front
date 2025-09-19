import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'kakao' | 'google';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  leftIcon?: ReactNode;
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  kakao: 'bg-[#FEE500] text-black hover:brightness-95',
  google: 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50',
};

export const Button = ({
  children,
  leftIcon,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium transition-colors',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {leftIcon && <span className="w-5 h-5">{leftIcon}</span>}
      {children}
    </button>
  );
};
