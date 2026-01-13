import { cn } from '@/shared/lib';
import { COLORS, UI_TEXT } from '../constants/game';

interface GameSubmitButtonProps {
  onComplete?: () => void;
  completedCount: number;
  totalCount: number;
  isReady: boolean;
  showBadge?: boolean;
}

export const GameSubmitButton = ({
  onComplete,
  completedCount,
  totalCount,
  isReady,
  showBadge = true,
}: GameSubmitButtonProps) => {
  return (
    <div className="relative w-full mt-4">
      {showBadge && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-8 px-6 py-2 rounded-t-xl text-white font-bold text-sm shadow-md flex items-center justify-center z-0 whitespace-nowrap"
          style={{ backgroundColor: COLORS.BADGE_PINK }}
        >
          {completedCount}/{totalCount} 완료
        </div>
      )}

      <button
        onClick={onComplete}
        className={cn(
          'relative z-10 w-[110%] -left-[5%] h-16 rounded-full text-2xl font-extrabold shadow-lg',
          'hover:brightness-95 transition-all active:scale-95',
          isReady ? 'text-white' : 'bg-white text-black',
        )}
        style={{
          backgroundColor: isReady ? COLORS.TIMER_RED : undefined,
        }}
      >
        {isReady ? UI_TEXT.BUTTON.CANCEL : UI_TEXT.BUTTON.COMPLETE}
      </button>
    </div>
  );
};
