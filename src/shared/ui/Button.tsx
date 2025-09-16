import type { ComponentProps } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  textColor?: 'white' | 'black' | 'gray';
  bgColor?: 'blue' | 'red' | 'green' | 'transparent';
  children: React.ReactNode;
}

const Button = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  textColor = 'white',
  bgColor = 'blue',
  className,
  ref,
  ...rest
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  const baseClasses = 'font-bold rounded-xl transition-colors';

  const variantClasses = {
    primary: 'hover:opacity-90',
    secondary: 'hover:opacity-80',
    ghost: 'bg-transparent hover:bg-gray-100',
  }[variant];

  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  }[size];

  const textColorClasses = {
    white: 'text-white',
    black: 'text-black',
    gray: 'text-gray-500',
  }[textColor];

  const bgColorClasses = {
    blue: 'bg-blue-700',
    red: 'bg-red-500',
    green: 'bg-green-500',
    transparent: 'bg-transparent',
  }[bgColor];

  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={clsx(
        baseClasses,
        variantClasses,
        sizeClasses,
        textColorClasses,
        bgColor !== 'transparent' && bgColorClasses,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
