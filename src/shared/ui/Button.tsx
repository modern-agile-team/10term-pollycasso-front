// src/shared/ui/button/Button.tsx

import React from 'react';

// Props 타입 정의
interface ButtonProps {
  /** 버튼 내용  */
  children?: React.ReactNode;
  /** 버튼 클릭 이벤트 */
  onClick?: () => void;
  /** 버튼 비활성화 상태 */
  disabled?: boolean;
  /** 버튼 타입 */
  type?: 'button' | 'submit' | 'reset';
  /** 버튼 스타일 종류 */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** 버튼 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 버튼 텍스트 색상 */
  textColor?: 'white' | 'black' | 'gray';
  /** 버튼 배경 색상 */
  bgColor?: 'blue' | 'red' | 'green';
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
  ...rest
}: ButtonProps) => {
  const baseClasses = 'font-bold rounded-full transition-colors';
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
  }[bgColor];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${textColorClasses} ${bgColorClasses}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
