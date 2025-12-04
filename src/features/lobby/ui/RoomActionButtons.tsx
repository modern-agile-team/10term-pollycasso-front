import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

interface RoomActionButtonsProps {
  amIHost: boolean;
  canStartGame: boolean;
  isReady: boolean;
  onMainAction: () => void;
  onLeave: () => void;
}

const BigButton = ({
  onClick,
  disabled,
  className,
  children,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full h-[79px] rounded-2xl text-3xl text-white font-bold shadow-md transition active:scale-95 flex items-center justify-center gap-2',
        className,
      )}
    >
      {children}
    </button>
  );
};

export const RoomActionButtons = ({
  amIHost,
  canStartGame,
  isReady,
  onMainAction,
  onLeave,
}: RoomActionButtonsProps) => {
  const getMainButtonConfig = () => {
    if (amIHost) {
      return {
        text: '게임 시작',
        style: canStartGame
          ? 'bg-[#2ADB75] hover:bg-[#20C064] cursor-pointer'
          : 'bg-gray-400 cursor-not-allowed',
        disabled: !canStartGame,
      };
    }
    return {
      text: isReady ? '준비 취소' : '게임 준비',
      style: isReady
        ? 'bg-[#FF5353] hover:bg-[#D9342B]'
        : 'bg-[#2ADB75] hover:bg-[#20C064]',
      disabled: false,
    };
  };

  const config = getMainButtonConfig();

  return (
    <div className="flex flex-col justify-between h-[178px]">
      <BigButton
        onClick={onMainAction}
        disabled={config.disabled}
        className={config.style}
      >
        {config.text}
      </BigButton>

      <BigButton onClick={onLeave} className="bg-black hover:bg-black/90">
        방 나가기
      </BigButton>
    </div>
  );
};
