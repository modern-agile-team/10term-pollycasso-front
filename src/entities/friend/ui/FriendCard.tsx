import { useState } from 'react';
import {
  EllipsisVerticalIcon,
  NoSymbolIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { getLevelBadgeColor } from '../lib/badgeColor';
import type {
  FriendAction,
  FriendProfile,
  FriendRelation,
} from '../model/types';
import { getOutfitImageUrl, OUTFIT_LAYERS } from '@/shared/lib/cdn';
import { useSound } from '@/entities/sound';
import { SoundManager } from '@/shared/api/sound/manager';
import { SOUND_ASSETS } from '@/shared/api/sound/assets';

interface FriendCardProps extends FriendProfile {
  relation: FriendRelation;
  onAction: (action: FriendAction) => void;
}

export const FriendCard = ({
  userId,
  nickname,
  outfit,
  level,
  tag,
  relation,
  isOnline,
  onAction,
}: FriendCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isMuted, sfxVolume } = useSound();

  const playClick = () => {
    if (!isMuted) {
      SoundManager.playSfx(SOUND_ASSETS.SFX.CLICK, sfxVolume);
    }
  };

  const handleActionClick = (action: FriendAction, message?: string) => {
    playClick();

    if (message && !window.confirm(message)) return;
    onAction(action);
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`relative flex justify-between p-4 lg:p-5 h-24 lg:h-28 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow ${
        relation === 'BLOCKED' ? 'opacity-60 grayscale' : ''
      }`}
    >
      <div className="flex items-center gap-x-3 lg:gap-x-4 overflow-hidden">
        <div className="relative shrink-0 w-16 h-16 lg:w-18 lg:h-18 rounded-full bg-black/5 border border-gray-200 overflow-hidden flex items-center justify-center">
          {outfit ? (
            OUTFIT_LAYERS.map((layer) => {
              const partId = outfit[layer];
              if (!partId) return null;
              return (
                <img
                  key={layer}
                  src={getOutfitImageUrl(partId)}
                  alt={layer}
                  className="absolute object-cover scale-[1.2] top-3"
                  style={{ zIndex: OUTFIT_LAYERS.indexOf(layer) }}
                />
              );
            })
          ) : (
            <span className="text-gray-300 text-xs font-medium">No Outfit</span>
          )}
        </div>

        <div className="flex flex-col justify-center h-full py-1 overflow-hidden">
          <span className="text-xl lg:text-2xl font-bold truncate pr-2 text-gray-800">
            {nickname}
          </span>
          <div className="flex items-center gap-x-2 mt-1">
            <span
              className={`w-12 lg:w-14 h-6 lg:h-7 flex items-center justify-center text-sm text-white lg:text-base rounded-[6px] tabular-nums ${getLevelBadgeColor(
                level,
              )}`}
            >
              {tag}
            </span>
            <span
              className={`text-lg lg:text-xl truncate font-semibold ${
                isOnline ? 'text-green-500' : 'text-gray-400'
              }`}
            >
              {isOnline ? '게임 중' : '오프라인'}
            </span>
          </div>
        </div>
      </div>

      <div className="shrink-0 flex flex-col items-end justify-start h-full mt-1">
        {relation === 'FRIEND' && (
          <div className="relative">
            <button
              onClick={() => {
                playClick();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="flex items-center"
            >
              <EllipsisVerticalIcon className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400 hover:text-gray-600 transition-colors -mr-2" />
            </button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => {
                    playClick();
                    setIsMenuOpen(false);
                  }}
                />
                <div className="absolute right-0 top-8 w-32 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden py-1 flex flex-col">
                  <button
                    onClick={() =>
                      handleActionClick(
                        'BLOCK',
                        `${nickname}님을 차단하시겠습니까?`,
                      )
                    }
                    className="w-full flex items-center gap-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                  >
                    <NoSymbolIcon className="w-4 h-4" /> 차단하기
                  </button>
                  <button
                    onClick={() =>
                      handleActionClick(
                        'DELETE',
                        `${nickname}님을 친구 목록에서 삭제하시겠습니까?`,
                      )
                    }
                    className="w-full flex items-center gap-x-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors text-left font-medium"
                  >
                    <TrashIcon className="w-4 h-4" /> 친구 삭제
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {relation === 'REQUEST_SENT' && (
          <button
            onClick={() =>
              handleActionClick('CANCEL', '친구 신청을 취소하시겠습니까?')
            }
            className="px-4 py-1.5 bg-gray-700 hover:bg-gray-800 text-white text-sm lg:text-base font-bold rounded-lg transition-colors shadow-sm"
          >
            취소
          </button>
        )}

        {relation === 'REQUEST_RECEIVED' && (
          <div className="flex items-center gap-x-2">
            <button
              onClick={() => handleActionClick('ACCEPT')}
              className="px-4 py-1.5 bg-[#2ADB75] hover:bg-[#25c468] text-white text-sm lg:text-base font-bold rounded-lg shadow-md transition-all active:scale-95"
            >
              수락
            </button>
            <button
              onClick={() =>
                handleActionClick('REJECT', '친구 신청을 거절하시겠습니까?')
              }
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm lg:text-base font-bold rounded-lg transition-colors"
            >
              거절
            </button>
          </div>
        )}

        {relation === 'BLOCKED' && (
          <button
            onClick={() =>
              handleActionClick('UNBLOCK', '차단을 해제하시겠습니까?')
            }
            className="text-xs lg:text-sm text-red-500 font-bold border border-red-200 px-2.5 py-1 rounded-md hover:bg-red-50 transition-colors bg-white/50"
          >
            차단됨
          </button>
        )}
      </div>
    </div>
  );
};
