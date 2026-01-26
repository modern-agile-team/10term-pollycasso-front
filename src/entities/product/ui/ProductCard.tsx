import { Coin } from '@/assets';
import type { Product } from '../model/types';
import { cn } from '@/shared/lib';

interface ProductItemProps {
  product: Product;
  isInCart: boolean;
  onAddToCart: (product: Product) => void;
  onWearItem: (product: Product) => void;
}

export const ProductCard = ({
  product,
  isInCart,
  onAddToCart,
  onWearItem,
}: ProductItemProps) => {
  return (
    <div
      className="flex flex-col items-center justify-between w-[260px] h-[350px] bg-white rounded-[20px] text-2xl font-bold text-gray-400 p-5"
      onClick={() => onWearItem(product)}
    >
      <div className="w-full h-[45px] flex gap-x-2">
        <div className="w-[45px] h-[45px] bg-yellow-300 rounded-full shrink-0"></div>
        <div className="flex flex-col justify-center flex-1 text-base overflow-hidden">
          <span className="text-black text-sm">Lv.{product.level}</span>
          <span className="text-[#535353] truncate">{product.name}</span>
        </div>
      </div>

      <img
        src={product.image}
        className="flex-1 object-contain my-2"
        alt={product.name}
      />

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
            onAddToCart(product);
          }}
          disabled={isInCart}
          className={cn(
            'flex justify-center items-center w-1/3 h-full text-base text-white pt-0.5 transition-colors',
            isInCart
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2CC724] hover:bg-[#2c9527]',
          )}
        >
          {isInCart ? '완료' : '담기'}
        </button>
      </div>
    </div>
  );
};
