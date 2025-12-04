import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { cn } from '@/shared/lib/cn';

interface ChatSendButtonProps {
  disabled: boolean;
  onSend: () => void;
}

export const ChatSendButton = ({ disabled, onSend }: ChatSendButtonProps) => {
  return (
    <button
      onClick={onSend}
      disabled={disabled}
      className={cn(
        'w-8 h-8 flex items-center justify-center rounded-full text-white transition self-center mr-2',
        disabled
          ? 'bg-[#2a7140]/70 cursor-not-allowed'
          : 'bg-[#2a7140] hover:bg-[#1d6133]',
      )}
    >
      <ArrowUpIcon className="w-5 h-5 text-bold" />
    </button>
  );
};
