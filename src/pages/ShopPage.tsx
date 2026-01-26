import { useCart } from '@/features/cart';
import {
  SHOP_CATEGORIES,
  useShopFilter,
  type CategoryType,
} from '@/features/shop';
import { MOCK_PRODUCTS } from '@/mocks/shop.mock';
import { ShopSidebar, ShopProductList, ShopProfilePanel } from '@/widgets/shop';
import { useMemo } from 'react';

const ShopPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const {
    isSortOpen,
    activeSort,
    activeSortLabel,
    activeCategory,
    toggleSortOpen,
    handleSortChange,
    handleCategoryChange,
  } = useShopFilter();

  const filteredProducts = useMemo(() => {
    const targetCategoryLabel = SHOP_CATEGORIES[activeCategory as CategoryType];

    // 2. 변환된 한글 라벨로 목데이터 필터링
    return MOCK_PRODUCTS.filter(
      (item) => item.subCategory === targetCategoryLabel,
    );
  }, [activeCategory]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen gap-[24px] font-ssrm font-bold">
      <ShopSidebar
        isSortOpen={isSortOpen}
        activeSort={activeSort}
        activeSortLabel={activeSortLabel}
        activeCategory={activeCategory}
        onToggleSort={toggleSortOpen}
        onSortChange={handleSortChange}
        onCategoryChange={handleCategoryChange}
      />

      <ShopProductList
        products={filteredProducts}
        cart={cart}
        onAddToCart={addToCart}
      />

      <ShopProfilePanel cart={cart} onRemoveFromCart={removeFromCart} />
    </div>
  );
};

export default ShopPage;
