import {
  ACTIVE_STYLE,
  DISABLED_STYLE,
  TEAM_COLORS,
} from '@/features/lobby/constants/colors';
import { cn } from '@/shared/lib/cn';

interface TeamTabProps {
  teamId: 'BLUE' | 'RED';
  isMyTeam: boolean;
  position: 'top' | 'bottom';
  onClick: () => void;
  className?: string;
}

export const TeamTab = ({
  teamId,
  isMyTeam,
  position,
  onClick,
  className,
}: TeamTabProps) => {
  const positionClassName =
    position === 'top' ? 'top-[100px]' : 'bottom-[100px]';

  const stateClassName = isMyTeam
    ? DISABLED_STYLE
    : cn('bg-gradient-to-b', TEAM_COLORS[teamId], ACTIVE_STYLE);

  return (
    <button
      onClick={onClick}
      disabled={isMyTeam}
      className={cn(
        'absolute -left-10 w-10 py-8 rounded-l-2xl flex flex-col items-center justify-center text-lg leading-5 z-10',
        positionClassName,
        stateClassName,
        className,
      )}
    >
      {'팀바꾸기'.split('').map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </button>
  );
};
