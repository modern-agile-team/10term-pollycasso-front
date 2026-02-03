import type { CSSProperties } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

import { Coin } from '@/assets';

interface RankRowProps {
  rank: number;
  nickname: string;
  coins: number;
  xp: number;
  score: number;
  className?: string;
  style?: CSSProperties;
  rankText?: string;
  teamId?: string | null;
}

export const RankRow = ({
  rank,
  nickname,
  coins,
  xp,
  score,
  className,
  style,
  rankText,
  teamId,
}: RankRowProps) => {
  let expBgColor = 'bg-[#6B8E8E]';
  let pointColor = 'text-[#525252]';

  if (teamId === 'RED') {
    expBgColor = 'bg-[#FB6464]';
    pointColor = 'text-[#FB6464]';
  } else if (teamId === 'BLUE') {
    expBgColor = 'bg-[#64ACFF]';
    pointColor = 'text-[#64ACFF]';
  }

  return (
    <div
      style={style}
      className={`flex items-center justify-between w-[1100px] h-[100px] px-10 bg-[#EFEFEF] rounded-[30px] shadow-sm ${className}`}
    >
      <div className="flex items-center gap-10">
        <span className="font-ssrm font-bold text-[#525252] text-4xl w-16 text-center">
          {rankText ? rankText : `${rank}th`}
        </span>

        <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center border-2 border-white shadow-sm">
          <img
            src={''}
            alt="avatar"
            className="w-full h-full object-cover mt-6"
          />
        </div>
        <span className="font-ssrm font-bold text-[#525252] text-3xl pt-1">
          {nickname}
        </span>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <img src={Coin} alt="coin" className="w-8 h-8 object-contain" />
          <span className="font-ssrm font-bold text-[#525252] text-2xl pt-1">
            {coins}coin
          </span>
        </div>

        <div
          className={`${expBgColor} px-4 py-1 rounded-full flex items-center justify-center`}
        >
          <span className="font-ssrm font-bold text-white text-xl pt-0.5">
            +{xp}xp
          </span>
        </div>

        <div className="flex items-center ml-16 gap-2 w-16 justify-end">
          <StarIcon className={`w-6 h-6 ${pointColor}`} />
          <span className={`font-ssrm font-bold ${pointColor} text-xl pt-1`}>
            {(score / 30).toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
