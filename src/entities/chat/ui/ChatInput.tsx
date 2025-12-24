import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib';

type InputProps = Pick<
  ComponentProps<'input'>,
  'value' | 'onKeyDown' | 'className' | 'placeholder'
>;

interface ChatInputProps extends InputProps {
  onChange: (v: string) => void;
  setIsComposing: (v: boolean) => void;
}

export const ChatInput = ({
  value,
  onChange,
  onKeyDown,
  setIsComposing,
  className,
  placeholder = '메세지를 보내주세요!',
}: ChatInputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
      maxLength={50}
      className={cn(
        'px-3 outline-none h-full bg-transparent font-normal text-lg',
        className,
      )}
      placeholder={placeholder}
    />
  );
};
