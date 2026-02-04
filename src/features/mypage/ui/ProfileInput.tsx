import { useState } from 'react';
import type { ComponentProps } from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

interface ProfileInputProps extends ComponentProps<'input'> {
  isValid?: boolean;
  hasError?: boolean;
}

export const ProfileInput = ({
  type = 'text',
  isValid = false,
  hasError = false,
  className,
  ...props
}: ProfileInputProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const inputType = type === 'password' && isRevealed ? 'text' : type;
  const isPasswordType = type === 'password';

  const borderClass = hasError
    ? 'border-red-500 bg-red-500/5'
    : 'border-white focus-within:border-green-400 focus-within:bg-white/5';

  return (
    <div
      className={`flex justify-between items-center pl-6 pr-4 w-[400px] h-[70px] bg-transparent border-[1px] rounded-2xl transition-all ${borderClass} ${className}`}
    >
      <input
        type={inputType}
        className="w-full h-full bg-transparent text-white text-2xl focus:outline-none font-pretendard placeholder:text-white/60"
        {...props}
      />

      <div className="flex items-center gap-2">
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setIsRevealed(!isRevealed)}
            className="p-1 text-gray-300 hover:text-white transition-colors"
          >
            {isRevealed ? (
              <EyeIcon className="w-7 h-7" />
            ) : (
              <EyeSlashIcon className="w-7 h-7" />
            )}
          </button>
        )}

        {hasError ? (
          <XCircleIcon className="w-9 h-9 text-red-500 transition-colors" />
        ) : (
          <CheckCircleIcon
            className={`w-9 h-9 transition-colors ${isValid ? 'text-green-400' : 'text-white'}`}
          />
        )}
      </div>
    </div>
  );
};
