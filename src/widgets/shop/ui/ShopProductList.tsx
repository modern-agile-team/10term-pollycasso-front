import type { Product } from '@/entities/product';
import { ProductCard } from '@/entities/product';

interface ShopProductListProps {
  products: Product[];
  cart: Product[];
  onAddToCart: (product: Product) => void;
}

export const ShopProductList = ({
  products,
  cart,
  onAddToCart,
}: ShopProductListProps) => {
  return (
    <div className="w-[900px] h-[720px] rounded-[30px] bg-[#1E3411]/40 shadow-inner p-8 pr-4">
      <div className="w-full h-full overflow-y-auto pr-4 custom-scrollbar">
        <div className="grid grid-cols-3 gap-x-[20px] gap-y-[30px]">
          {products.length === 0 ? (
            <div className="col-span-3 h-full flex items-center justify-center text-white/50 text-xl font-bold">
              해당 카테고리에 아이템이 없습니다.
            </div>
          ) : (
            products.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                isInCart={cart.some((c) => c.id === item.id)}
                onAddToCart={onAddToCart}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
