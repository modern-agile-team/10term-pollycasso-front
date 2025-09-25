import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isFocused: boolean;
  hasValue: boolean;
}

export const Input = ({
  label,
  isFocused,
  hasValue,
  id,
  ...props
}: InputProps) => {
  return (
    <>
      <input
        id={id}
        autoComplete="off"
        className="w-full px-6 pt-[20px] pb-[16px] bg-transparent focus:outline-none"
        {...props}
      />
      <label
        htmlFor={id}
        className={clsx(
          'absolute left-6 transition-all duration-200 pointer-events-none font-pretendard',
          {
            'text-xs text-[#8C8C8C] top-[6px]': isFocused || hasValue,
            'text-lg text-black top-[16px]': !isFocused && !hasValue,
          },
        )}
      >
        {label}
      </label>
    </>
  );
};
