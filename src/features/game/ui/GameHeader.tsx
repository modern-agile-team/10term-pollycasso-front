import Marquee from 'react-fast-marquee';

import { UI_TEXT } from '../constants/game';

interface GameHeaderProps {
  currentTheme: string | null;
}

export const GameHeader = ({ currentTheme }: GameHeaderProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="mt-4 py-2 text-black bg-[#D9D9D9]/45 shadow-sm shadow-black/40">
        <Marquee gradient={false} speed={50}>
          <span className="text-lg mx-4 font-bold">{UI_TEXT.NOTICE}</span>
        </Marquee>
      </div>

      <div className="mt-4 flex items-center justify-center w-full px-6 h-16">
        <div className="text-center text-4xl font-bold truncate px-4">
          {currentTheme && (
            <span>
              {UI_TEXT.THEME_PREFIX} {currentTheme}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
