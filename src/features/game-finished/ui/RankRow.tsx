import { Bird, Coin } from '@/assets';
import { StarIcon } from '@heroicons/react/24/solid';

interface RankRowProps {
  rank: number;
  nickname: string;
  coins: number;
  xp: number;
  score: number;
  className?: string;
}

export const RankRow = ({
  rank,
  nickname,
  coins,
  xp,
  score,
  className,
}: RankRowProps) => {
  return (
    <div
      className={`flex items-center justify-between w-[1100px] h-[100px] px-10 bg-[#EFEFEF] rounded-[30px] shadow-sm ${className}`}
    >
      <div className="flex items-center gap-10">
        <span className="font-ssrm font-bold text-[#525252] text-4xl w-16 text-center">
          {rank}th
        </span>
        <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center border-2 border-white shadow-sm">
          {/* TODO: Bird 이미지도 받아오도록 설정 */}
          <img
            src={Bird}
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

        <div className="bg-[#6B8E8E] px-4 py-1 rounded-full flex items-center justify-center">
          <span className="font-ssrm font-bold text-white text-xl pt-0.5">
            +{xp}xp
          </span>
        </div>

        <div className="flex items-center ml-16 gap-2 w-16 justify-end">
          <StarIcon className="w-6 h-6 text-[#525252]" />
          <span className="font-ssrm font-bold text-[#525252] text-xl pt-1">
            {score}
          </span>
        </div>
      </div>
    </div>
  );
};
