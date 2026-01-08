import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

import { getLevelBadgeColor } from '../lib/badgeColor';
import type { FriendRelation } from '../model/types';

interface FriendCardProps {
  userId: number | string;
  nickname: string;
  outfit?: string;
  level: number;
  relation: FriendRelation;
  isOnline: boolean;
}

export const FriendCard = ({
  userId,
  nickname,
  outfit,
  level,
  relation,
  isOnline,
}: FriendCardProps) => {
  const [displayName, displayTag] = nickname.split('#');
  const safeTag = displayTag || '0000';

  return (
    <div
      className={`flex justify-between p-4 lg:p-5 h-24 lg:h-28 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow ${relation === 'BLOCKED' ? 'opacity-50 grayscale' : ''}`}
    >
      <div className="flex items-center gap-x-3 lg:gap-x-4 overflow-hidden">
        <div className="shrink-0 w-16 h-16 lg:w-18 lg:h-18 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
          {outfit ? (
            <img
              src={outfit}
              alt="outfit"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-300 text-xs">No Outfit</span>
          )}
        </div>

        <div className="flex flex-col justify-center h-full py-1 overflow-hidden">
          <span className="text-xl lg:text-2xl font-bold truncate pr-2 text-gray-800">
            {displayName}
          </span>

          <div className="flex items-center gap-x-2 mt-1">
            <span
              className={`w-12 lg:w-14 h-6 lg:h-7 flex items-center justify-center text-sm text-white lg:text-base rounded-[6px] tabular-nums ${getLevelBadgeColor(level)}`}
            >
              {safeTag}
            </span>
            <span
              className={`text-lg lg:text-xl truncate font-semibold ${isOnline ? 'text-green-500' : 'text-gray-400'}`}
            >
              {isOnline ? '게임 중' : '오프라인'}
            </span>
          </div>
        </div>
      </div>

      <div className="shrink-0 flex flex-col items-end justify-start h-full mt-1">
        {relation === 'FRIEND' && (
          <button>
            <EllipsisVerticalIcon className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        )}

        {relation === 'REQUEST_SENT' && (
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-800 text-white text-sm lg:text-base font-bold rounded-lg transition-colors">
            취소
          </button>
        )}

        {relation === 'REQUEST_RECEIVED' && (
          <div className="flex items-center gap-x-2">
            <button className="px-3 py-1 bg-[#2ADB75] hover:bg-[#25c468] text-white text-sm lg:text-base font-bold rounded-lg shadow-sm transition-all">
              수락
            </button>
            <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm lg:text-base font-bold rounded-lg transition-colors">
              거절
            </button>
          </div>
        )}

        {relation === 'BLOCKED' && (
          <span className="text-xs lg:text-sm text-red-500 font-bold border border-red-200 px-2 py-1 rounded">
            차단됨
          </span>
        )}
      </div>
    </div>
  );
};
