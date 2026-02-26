import { useState } from 'react';
import {
  XMarkIcon,
  BellAlertIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
import { Crown } from '@/assets';
import { cn } from '@/shared/lib';
import { ScalableText } from './ScalableText';
import { getOutfitImageUrl, OUTFIT_LAYERS } from '@/shared/lib/cdn';
import type { Player } from '@/shared/model';
import { getLevelColor } from '@/shared/lib/color';

interface PlayerSlotProps {
  player?: Player;
  isHost: boolean;
  canKick: boolean;
  onKick: () => void;
  onNudge?: () => void;
  className?: string;
}

export const PlayerSlot = ({
  player,
  isHost,
  canKick,
  onKick,
  onNudge,
  className,
}: PlayerSlotProps) => {
  // 쿨타임 관리
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  if (!player) {
    return (
      <div className="px-4 pt-6 rounded-2xl bg-black/20">
        <div className="flex justify-between items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-black/20"></div>
          <div className="w-36 h-9 rounded-full bg-black/20"></div>
        </div>
        <div className="w-full h-[200px] aspect-square rounded-lg bg-black/20"></div>
      </div>
    );
  }

  // 방장은 데이터상으로는 항상 준비 상태
  const isReadyVisual = player.isReady || isHost;
  const playerOutfit = player.outfit;

  const STATUS_CONFIG = {
    IDLE: { text: '대기', color: 'bg-gray-200 text-gray-500' },
    SHOPPING: {
      text: '쇼핑 중..',
      color: 'bg-[#FFD700] text-white border border-white',
    },
    CUSTOMIZING: {
      text: '단장 중..',
      color: 'bg-[#FF69B4] text-white border border-white',
    },
  };

  const currentStatus = (player.status as keyof typeof STATUS_CONFIG) || 'IDLE';
  const statusBadge = STATUS_CONFIG[currentStatus];

  const isBusy =
    player.status === 'SHOPPING' || player.status === 'CUSTOMIZING';

  // 재촉 가능 조건 (바쁨 + 재촉 기능 활성화됨)
  const canNudge = !!onNudge && isBusy;

  const handleNudgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCoolingDown) return;

    onNudge?.();
    setIsCoolingDown(true);

    setTimeout(() => {
      setIsCoolingDown(false);
    }, 3000);
  };

  return (
    <div
      className={cn(
        'w-full px-4 pt-6 rounded-2xl bg-white relative group transition-all duration-200',
        className,
      )}
    >
      {canKick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onKick();
          }}
          className={cn(
            'absolute -top-3 -right-3 z-30 flex items-center justify-center w-8 h-8 rounded-full bg-[#FF553F] border-2 border-white text-white shadow-md transition-all duration-200',
            'hover:bg-[#FF331F] hover:scale-110 active:scale-95',
          )}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}

      {/* 재촉 오버레이 */}
      {canNudge && (
        <div
          onClick={handleNudgeClick}
          className={cn(
            'absolute inset-0 z-20 rounded-2xl bg-black/60 transition-opacity duration-500',
            'flex flex-col items-center justify-center backdrop-blur-[2px]',
            isCoolingDown
              ? 'opacity-100 cursor-default'
              : 'opacity-0 group-hover:opacity-100 cursor-pointer',
          )}
        >
          {isCoolingDown ? (
            <>
              <CheckCircleIcon className="w-12 h-12 text-[#2ADB75] mb-2 animate-pulse" />
              <span className="text-[#2ADB75] font-bold text-xl drop-shadow-md">
                전송 완료!
              </span>
            </>
          ) : (
            <>
              <BellAlertIcon className="w-12 h-12 text-white mb-2 animate-bounce" />
              <span className="text-white font-bold text-xl drop-shadow-md">
                재촉하기!
              </span>
            </>
          )}
        </div>
      )}

      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex items-center gap-2 w-full">
          <div
            className={`relative flex justify-center items-center shrink-0 w-10 h-10 rounded-full ${getLevelColor(player.level)} text-white font-bold text-lg shadow-sm`}
          >
            {isHost && (
              <img
                src={Crown}
                alt="방장 왕관"
                className="absolute -top-5 left-1/2 -translate-x-1/2 w-7 h-auto z-10 drop-shadow-sm pointer-events-none"
              />
            )}
            {player.level}
          </div>
          <div className="flex-1 min-w-0 text-2xl font-bold text-gray-800">
            <ScalableText>{player.nickname}</ScalableText>
          </div>
        </div>

        <div className="shrink-0 ml-2">
          {!isHost && player.isReady ? (
            <span className="px-2.5 py-1 rounded-full text-md font-bold text-white bg-[#2ADB75]">
              준비
            </span>
          ) : (
            (!isHost || currentStatus !== 'IDLE') && (
              <span
                className={cn(
                  'px-2.5 py-1 rounded-full text-md font-bold shadow-sm',
                  statusBadge.color,
                )}
              >
                {statusBadge.text}
              </span>
            )
          )}
        </div>
      </div>

      <div
        className={cn(
          'relative flex items-center justify-center w-full h-[215px] aspect-square overflow-hidden bg-[#E3DDDD] rounded-lg transition-all duration-300 box-border',
          // 테두리 우선순위 로직
          // 1. 재촉 가능(바쁨) -> 무조건 빨간색 (호버 여부 상관없음!)
          // 2/ 준비 완료 -> 초록색
          // 3. 기본 -> 투명
          canNudge
            ? 'border-[5px] border-[#FF553F]'
            : isReadyVisual
              ? 'border-[5px] border-[#2ADB75]'
              : 'border-[5px] border-transparent',
        )}
      >
        {OUTFIT_LAYERS.map((layer) => {
          const partId = playerOutfit[layer];
          if (!partId) return null;
          return (
            <img
              key={layer}
              src={getOutfitImageUrl(partId)}
              alt={layer}
              className="absolute inset-0 w-full h-[200px] object-contain"
              style={{ zIndex: OUTFIT_LAYERS.indexOf(layer) }}
            />
          );
        })}
      </div>
    </div>
  );
};
