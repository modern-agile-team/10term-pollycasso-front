import { Bird } from '@/assets';
import { cn } from '@/shared/lib';

// TODO: FSD 원칙에 위배되기 때문에 파일 내 작성. 차후 수정 필요합니다.
interface Product {
  id: number;
  name: string;
  price: number;
  level: number;
  subCategory?: string;
  description?: string;
  image: string;
  outfitImage?: string;
}

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

export const CharacterPreview = ({
  level,
  nickname = '폴리칵소',
  previewItems,
  onReset,
  showResetButton = true,
  classNames,
}: CharacterPreviewProps) => {
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
          src={Bird}
          className="absolute w-[90%] h-auto object-contain z-10"
          alt="Character"
        />

        {previewItems.map((item) => (
          <img
            key={item.id}
            src={item.image}
            className="absolute h-[90%] w-auto object-contain z-20 pointer-events-none"
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
          className="flex items-center justify-center rounded-full text-xs px-3 py-1 bg-[#EF5F52] text-white z-20 hover:bg-[#d64538] transition-colors shrink-0 mb-2"
        >
          Reset
        </button>
      )}
    </div>
  );
};
