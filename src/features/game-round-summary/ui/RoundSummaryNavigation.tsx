import { RANK_ICONS } from '../constants/rankIcon';
import type { RoundResult } from '../model/types';

interface RoundSummaryNavigationProps {
  ranking: RoundResult[];
  selectedRank: number;
  onSelect: (rank: number) => void;
}

export const RoundSummaryNavigation = ({
  ranking,
  selectedRank,
  onSelect,
}: RoundSummaryNavigationProps) => {
  return (
    <div className="absolute left-10 top-72 -translate-y-1/2 flex flex-col gap-3 z-20">
      {ranking.map((result, index) => {
        const rank = index + 1;
        const rankIcon = RANK_ICONS[rank as keyof typeof RANK_ICONS];
        const isSelected = selectedRank === rank;

        return (
          <button
            key={result.userId}
            onClick={() => onSelect(rank)}
            className={`
              w-44 h-16 rounded-2xl flex items-center px-4 gap-3 transition-all
              ${isSelected ? 'bg-[#1B1B1B] scale-105 shadow-lg' : 'bg-[#606060] hover:bg-gray-600'}
            `}
          >
            <div className="w-10 h-10 flex-shrink-0">
              <img
                src={rankIcon}
                alt={`${rank}등`}
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-white font-bold truncate">
              {result.userId}
            </span>

            {result.isMine && (
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
};
