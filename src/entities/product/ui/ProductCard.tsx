import { Coin } from '@/assets';
import type { Product } from '../model/types';
import { cn } from '@/shared/lib';
import { getShopItemUrl } from '@/shared/lib/assets';

interface ProductItemProps {
  product: Product;
  isInCart: boolean;
  isOwned?: boolean;
  isBuyDisabled?: boolean;
  onAddToCart: (product: Product) => void;
  onWearItem: (product: Product) => void;
}

export const ProductCard = ({
  product,
  isInCart,
  isOwned = false,
  isBuyDisabled = false,
  onAddToCart,
  onWearItem,
}: ProductItemProps) => {
  const isButtonDisabled = isInCart || isBuyDisabled;

  const getButtonText = () => {
    if (isBuyDisabled) return '구매됨';
    if (isInCart) return '담김';
    return '담기';
  };

  return (
    <div
      className="flex flex-col items-center justify-between w-[240px] h-[350px] bg-white rounded-[20px] text-2xl font-bold text-gray-400 p-5 cursor-pointer hover:scale-[1.02] transition-transform relative" // relative 추가 (필요시)
      onClick={() => onWearItem(product)}
    >
      <div className="w-full h-[52px] flex gap-x-2">
        <div className="w-[45px] h-[45px] bg-yellow-300 rounded-full shrink-0"></div>
        <div className="flex flex-col justify-center flex-1 text-base overflow-hidden">
          <span className="text-black text-lg">Lv.{product.level}</span>
          <span className="text-[#535353] truncate text-xl">
            {product.name}
          </span>
        </div>
      </div>

      <div className="relative w-full flex-1 my-2">
        {isOwned && (
          <div className="absolute top-0 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full z-10 pointer-events-none">
            보유중
          </div>
        )}

        <img
          src={getShopItemUrl(product.image)}
          className="w-full h-[190px] object-contain px-4"
          alt={product.name}
        />
      </div>

      <div className="flex justify-between w-full h-[45px] rounded-lg overflow-hidden shrink-0">
        <div className="flex items-center justify-center w-2/3 h-full bg-black">
          <img src={Coin} className="w-5 h-5" alt="coin" />
          <span className="text-white text-lg ml-2 pt-0.5">
            {product.price}coin
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isButtonDisabled) {
              onAddToCart(product);
            }
          }}
          disabled={isButtonDisabled}
          className={cn(
            'flex justify-center items-center w-1/3 h-full text-base text-white pt-0.5 transition-colors',
            isButtonDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2CC724] hover:bg-[#2c9527]',
          )}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};
