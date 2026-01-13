import { PlusIcon } from '@heroicons/react/24/solid';

import { getLevelBadgeColor } from '../lib/badgeColor';
import type { FriendProfile } from '../model/types';

interface RecommendedFriendCardProps extends FriendProfile {
  className?: string;
  onAdd?: () => void;
  isRequested?: boolean;
}

export const RecommendedFriendCard = ({
  nickname,
  level,
  isOnline,
  outfit,
  className,
  onAdd,
  isRequested = false,
}: RecommendedFriendCardProps) => {
  const [displayName, displayTag] = nickname.split('#');
  const safeTag = displayTag || '0000';

  return (
    <div className={`flex items-center justify-between p-4 ${className}`}>
      <div className="flex items-center gap-x-4 overflow-hidden">
        <div className="shrink-0 w-14 h-14 rounded-full bg-white overflow-hidden flex items-center justify-center border border-gray-200">
          {outfit ? (
            <img
              src={outfit}
              alt={`${displayName}의 아바타`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}
        </div>

        <div className="flex items-center gap-x-2 min-w-0 pr-1">
          <span className="text-xl text-black font-bold truncate max-w-[140px] lg:max-w-[200px]">
            {displayName}
          </span>

          <span
            className={`shrink-0 px-1 text-lg text-white font-bold rounded tabular-nums ${getLevelBadgeColor(level)}`}
          >
            {safeTag}
          </span>

          <span className="shrink-0 text-lg text-white font-bold drop-shadow-sm">
            LV. {level}
          </span>

          <div
            className={`shrink-0 w-2.5 h-2.5 rounded-full ring-2 ring-white/50 ${isOnline ? 'bg-[#81D89B]' : 'bg-gray-400'}`}
          />
        </div>
      </div>

      <button
        onClick={isRequested ? undefined : onAdd}
        disabled={isRequested}
        className={`shrink-0 p-1 transition-all duration-200 ${isRequested ? 'cursor-default' : 'group cursor-pointer'}`}
      >
        <PlusIcon
          className={`w-6 h-6 text-white rounded-full p-0.5 transition-colors
              ${
                isRequested
                  ? 'bg-[#BABABA]'
                  : 'bg-gray-700 group-hover:bg-black'
              }
            `}
        />
      </button>
    </div>
  );
};
