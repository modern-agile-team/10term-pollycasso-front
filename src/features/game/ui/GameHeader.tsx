import { useMemo } from 'react';
import Marquee from 'react-fast-marquee';

import { COLORS, GAME_CONFIG, UI_TEXT } from '../constants/game';
import { useGameTimer } from './useGameTimer';

interface GameHeaderProps {
  currentTheme: string | null;
  endsAt: number | null;
}

export const GameHeader = ({ currentTheme, endsAt }: GameHeaderProps) => {
  const timeLeft = useGameTimer(endsAt);

  const timeProgress = (timeLeft / GAME_CONFIG.MAX_TIME) * 100;

  const timerColor = useMemo(() => {
    const ratio = timeLeft / GAME_CONFIG.MAX_TIME;

    if (ratio <= 1 / 3) return COLORS.TIMER_RED;
    if (ratio <= 2 / 3) return COLORS.TIMER_YELLOW;
    return COLORS.TIMER_GREEN;
  }, [timeLeft]);

  const timerStyle = {
    background: `conic-gradient(${timerColor} ${timeProgress}%, transparent 0)`,
    transform: 'scaleX(-1)',
  };

  return (
    <>
      <div className="mt-4 py-2 text-black bg-[#D9D9D9]/45 shadow-sm shadow-black/40">
        <Marquee gradient={false} speed={50}>
          <span className="text-lg mx-4 font-bold">{UI_TEXT.NOTICE}</span>
        </Marquee>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center w-full px-6">
        <div></div>

        <div className="text-center text-4xl font-bold truncate px-4">
          {UI_TEXT.THEME_PREFIX} {currentTheme ?? '주제 대기 중...'}
        </div>

        <div className="flex justify-end mr-2">
          <div className="flex flex-col items-center gap-1 pt-2">
            <div
              className="w-14 h-14 rounded-full bg-white shadow-sm border transition-colors duration-300"
              style={{
                ...timerStyle,
                borderColor: timerColor,
              }}
            />
            <span
              className="font-bold text-lg font-ssrm transition-colors duration-300"
              style={{ color: timerColor }}
            >
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
