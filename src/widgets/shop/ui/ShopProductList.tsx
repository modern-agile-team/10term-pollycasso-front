import type { Product } from '@/entities/product';
import { ProductCard } from '@/entities/product';
import { SHOP_CATEGORIES } from '@/features/shop/constants/shop.constants';

const CONSUMABLE_CATEGORIES = [SHOP_CATEGORIES.EFFECT];

interface ShopProductListProps {
  products: Product[];
  cart: Product[];
  inventoryIds: number[];
  onAddToCart: (product: Product) => void;
  onWearItem: (product: Product) => void;
}

export const ShopProductList = ({
  products,
  cart,
  inventoryIds,
  onAddToCart,
  onWearItem,
}: ShopProductListProps) => {
  return (
    <div className="w-[900px] h-[720px] rounded-[30px] bg-[#1E3411]/40 shadow-inner p-8 pr-4">
      <div className="w-full h-full overflow-y-auto p-2 pr-4 custom-scrollbar">
        <div className="grid grid-cols-3 gap-x-[20px] gap-y-[30px]">
          {products.length === 0 ? (
            <div className="col-span-3 h-full flex items-center justify-center text-white/50 text-xl font-bold">
              해당 카테고리에 아이템이 없습니다.
            </div>
          ) : (
            products.map((item) => {
              const isOwned = inventoryIds.includes(item.id);
              const isConsumable = CONSUMABLE_CATEGORIES.includes(
                item.subCategory || '',
              );

              const isBuyDisabled = isOwned && !isConsumable;

              return (
                <ProductCard
                  key={item.id}
                  product={item}
                  isInCart={cart.some((c) => c.id === item.id)}
                  isOwned={isOwned}
                  isBuyDisabled={isBuyDisabled}
                  onAddToCart={onAddToCart}
                  onWearItem={onWearItem}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
