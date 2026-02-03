import { useMemo } from 'react';
import { cn } from '@/shared/lib';
import { getOutfitItemUrl } from '@/shared/lib/assets';
import { SHOP_CATEGORIES } from '@/features/shop/constants/shop.constants';
import type { Product } from '@/entities/product';

const DEFAULT_BIRD_ID = 'bird_01';

interface CharacterPreviewProps {
  level: number;
  nickname?: string;
  previewItems: Product[];
  onReset?: () => void;
  showResetButton?: boolean;
  classNames?: {
    container?: string;
    header?: string;
    levelIcon?: string;
    levelText?: string;
    nicknameText?: string;
    shadow?: string;
  };
}

const LAYER_ORDER = [
  SHOP_CATEGORIES.BIRD,
  SHOP_CATEGORIES.ACCESSORY,
  SHOP_CATEGORIES.HAT,
  SHOP_CATEGORIES.SHOES,
  SHOP_CATEGORIES.BOTTOM,
  SHOP_CATEGORIES.TOP,
  SHOP_CATEGORIES.EFFECT,
];

export const CharacterPreview = ({
  level,
  nickname = '폴리칵소',
  previewItems,
  onReset,
  showResetButton = true,
  classNames,
}: CharacterPreviewProps) => {
  const selectedBird = previewItems.find(
    (item) => item.subCategory === SHOP_CATEGORIES.BIRD,
  );

  const birdImageId = selectedBird ? selectedBird.image : DEFAULT_BIRD_ID;

  const wearables = useMemo(() => {
    return previewItems
      .filter((item) => item.subCategory !== SHOP_CATEGORIES.BIRD)
      .sort((a, b) => {
        const indexA = LAYER_ORDER.indexOf(a.subCategory!);
        const indexB = LAYER_ORDER.indexOf(b.subCategory!);
        return indexA - indexB;
      });
  }, [previewItems]);

  return (
    <div
      className={cn(
        'flex flex-col items-center bg-white rounded-3xl p-6 pb-4 relative overflow-hidden',
        classNames?.container,
      )}
    >
      <div
        className={cn(
          'flex w-full gap-x-2 z-20 shrink-0',
          'h-[45px]',
          classNames?.header,
        )}
      >
        <div
          className={cn(
            'bg-yellow-300 rounded-full shrink-0',
            'w-[45px] h-[45px]',
            classNames?.levelIcon,
          )}
        />
        <div className="flex flex-col justify-center">
          <span
            className={cn(
              'text-black font-bold leading-none',
              'text-base',
              classNames?.levelText,
            )}
          >
            Lv.{level}
          </span>
          <span
            className={cn(
              'text-[#535353] leading-none',
              'text-lg',
              classNames?.nicknameText,
            )}
          >
            {nickname}
          </span>
        </div>
      </div>

      <div className="relative flex-1 w-full flex items-center justify-center z-10 my-2">
        <img
          src={getOutfitItemUrl(birdImageId)}
          className="absolute w-[90%] h-auto object-contain z-10"
          alt="Character Body"
        />

        {wearables.map((item) => (
          <img
            key={item.id}
            src={getOutfitItemUrl(item.image)}
            className="absolute w-[90%] h-auto object-contain z-20 pointer-events-none"
            alt={item.name}
          />
        ))}

        <div
          className={cn(
            'absolute bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,transparent_70%)] z-0',
            'bottom-[2%] w-[60%] h-[10%]',
            classNames?.shadow,
          )}
        />
      </div>

      {showResetButton && onReset && (
        <button
          onClick={onReset}
          className="flex items-center justify-center rounded-full text-xs px-3 py-1 bg-[#EF5F52] text-white z-30 hover:bg-[#d64538] transition-colors shrink-0 mb-2 cursor-pointer"
        >
          Reset
        </button>
      )}
    </div>
  );
};
