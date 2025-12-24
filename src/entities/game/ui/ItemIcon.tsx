import { useState } from 'react';

import { cn } from '@/shared/lib';

const CDN_BASE_URL = 'https://your-cdn-url.com';

export interface ItemIconProps {
  id: string | number;
  name: string;
  imagePath?: string;
  effect?: string;

  count: number;
  isOwned: boolean;
  className?: string;
  onClick?: () => void;
}

export const ItemIcon = ({
  name,
  imagePath,
  effect,
  count,
  isOwned,
  className,
  onClick,
}: ItemIconProps) => {
  const [imgError, setImgError] = useState(false);
  const showImage = imagePath && !imgError;

  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex flex-col items-center animate-fadeIn transition-all relative',
        isOwned ? 'opacity-100' : 'opacity-40 grayscale',
        className,
      )}
    >
      <div
        className={cn(
          'relative w-[70px] h-[70px] rounded-full mx-auto',
          'flex items-center justify-center font-bold text-sm select-none',
          'transition-transform duration-200',
          isOwned
            ? 'bg-white text-gray-700 hover:scale-105 cursor-pointer hover:shadow-lg'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-inner',
        )}
      >
        {showImage ? (
          <img
            src={`${CDN_BASE_URL}/${imagePath}`}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-xs text-center px-1 break-keep leading-tight">
            {name}
          </span>
        )}

        <div className="absolute inset-0 rounded-full shadow-inner shadow-black/30 pointer-events-none" />

        {isOwned && (
          <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full border border-white shadow-sm z-10">
            x{count}
          </span>
        )}
      </div>

      {effect && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-max max-w-[150px] bg-black/80 text-white text-[11px] px-2 py-1 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 text-center">
          {effect}
        </div>
      )}
    </div>
  );
};
