import { WardrobeItemCard } from '@/entities/product/ui/WardrobeItemCard';
import type { Product } from '@/entities/product';

interface WardrobeProductListProps {
  products: Product[];
  equippedItems: Product[];
  onWearItem: (product: Product) => void;
}

export const WardrobeProductList = ({
  products,
  equippedItems,
  onWearItem,
}: WardrobeProductListProps) => {
  return (
    <div className="w-full h-full overflow-y-auto pl-10 pr-6 custom-wardrobe-scrollbar">
      <div className="grid grid-cols-3 gap-x-[20px] gap-y-[30px] pb-10">
        {products.length === 0 ? (
          <div className="col-span-3 h-[400px] flex items-center justify-center text-white/50 text-xl font-bold">
            보유한 아이템이 없습니다.
          </div>
        ) : (
          products.map((item) => {
            const isEquipped = equippedItems.some(
              (equipped) => equipped.id === item.id,
            );

            return (
              <WardrobeItemCard
                key={item.id}
                product={item}
                isEquipped={isEquipped}
                onWear={onWearItem}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
