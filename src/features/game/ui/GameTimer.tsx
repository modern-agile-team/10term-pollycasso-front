import { useMemo } from 'react';

import { COLORS } from '../constants/game';
import { useGameTimer } from './useGameTimer';

interface GameTimerProps {
  endsAt: number | null;
  totalTime: number;
  className?: string;
}

export const GameTimer = ({
  endsAt,
  totalTime,
  className = '',
}: GameTimerProps) => {
  const timeLeft = useGameTimer(endsAt);
  const timeProgress = (timeLeft / totalTime) * 100;

  const timerColor = useMemo(() => {
    const ratio = timeLeft / totalTime;
    if (ratio <= 1 / 3) return COLORS.TIMER_RED;
    if (ratio <= 2 / 3) return COLORS.TIMER_YELLOW;
    return COLORS.TIMER_GREEN;
  }, [timeLeft, totalTime]);

  const timerStyle = {
    background: `conic-gradient(${timerColor} ${timeProgress}%, transparent 0)`,
    transform: 'scaleX(-1)',
  };

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-full bg-white shadow-sm border transition-colors duration-300"
          style={{
            ...timerStyle,
            borderColor: timerColor,
          }}
        />
      </div>

      <span
        className="font-bold text-2xl font-ssrm transition-colors duration-300"
        style={{ color: timerColor }}
      >
        {Math.ceil(timeLeft)}s
      </span>
    </div>
  );
};
