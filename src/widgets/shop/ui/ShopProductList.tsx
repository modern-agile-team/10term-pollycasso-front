import { MOCK_PRODUCTS } from '@/mocks/shop.mock';
import { ProductCard } from '@/entities/product';
import type { Product } from '@/entities/product';

interface ShopProductListProps {
  cart: Product[];
  onAddToCart: (product: Product) => void;
}

export const ShopProductList = ({
  cart,
  onAddToCart,
}: ShopProductListProps) => {
  return (
    <div className="w-[900px] h-[720px] rounded-[30px] bg-[#1E3411]/40 shadow-inner p-8 pr-4">
      <div className="w-full h-full overflow-y-auto pr-4 custom-scrollbar">
        <div className="grid grid-cols-3 gap-x-[20px] gap-y-[30px]">
          {MOCK_PRODUCTS.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              isInCart={cart.some((c) => c.id === item.id)}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
