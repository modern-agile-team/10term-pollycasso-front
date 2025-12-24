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
  const timerStyle = {
    background: `conic-gradient(${COLORS.TIMER_GREEN} ${timeProgress}%, transparent 0)`,
    transform: 'scaleX(-1)',
  };

  return (
    <>
      <div
        className="mt-4 py-2 bg-opacity-50 text-black"
        style={{ backgroundColor: COLORS.NOTICE_BG }}
      >
        <Marquee gradient={false} speed={50}>
          <span className="mx-4 font-bold">{UI_TEXT.NOTICE}</span>
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
              className="w-14 h-14 rounded-full bg-white shadow-sm border transition-all duration-300"
              style={{ ...timerStyle, borderColor: COLORS.TIMER_GREEN }}
            />
            <span
              className="font-bold text-lg font-ssrm"
              style={{ color: COLORS.TIMER_GREEN }}
            >
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
