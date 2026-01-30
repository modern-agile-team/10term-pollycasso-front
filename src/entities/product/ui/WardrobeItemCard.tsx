import { cn } from '@/shared/lib';
import type { Product } from '../model/types';
import { getShopItemUrl } from '@/shared/lib/assets';

interface WardrobeItemCardProps {
  product: Product;
  isEquipped: boolean;
  onWear: (product: Product) => void;
}

export const WardrobeItemCard = ({
  product,
  isEquipped,
  onWear,
}: WardrobeItemCardProps) => {
  return (
    <div
      onClick={() => onWear(product)}
      className={cn(
        'flex flex-col items-center justify-between w-[240px] h-[350px] rounded-[20px] p-5 cursor-pointer transition-all border-2',
        isEquipped
          ? 'bg-white border-[#52D843] shadow-[0_0_15px_rgba(82,216,67,0.4)]'
          : 'bg-white border-transparent hover:scale-[1.02]',
      )}
    >
      <div className="w-full h-[52px] flex gap-x-2">
        <div className="w-[45px] h-[45px] bg-yellow-300 rounded-full shrink-0"></div>
        <div className="flex flex-col justify-center flex-1 text-base overflow-hidden">
          <span className="text-black text-lg font-bold">
            Lv.{product.level}
          </span>
          <span className="text-[#535353] truncate text-xl font-bold">
            {product.name}
          </span>
        </div>
      </div>

      <img
        src={getShopItemUrl(product.image)}
        className="flex-1 object-contain px-4 my-2"
        alt={product.name}
      />

      <div
        className={cn(
          'flex justify-center items-center w-full h-[45px] rounded-lg text-xl font-bold text-white pt-1',
          isEquipped ? 'bg-[#52D843]' : 'bg-black',
        )}
      >
        {isEquipped ? '착용중' : '착용하기'}
      </div>
    </div>
  );
};
