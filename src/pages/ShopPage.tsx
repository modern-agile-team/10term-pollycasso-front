import { useMemo } from 'react';
import { useCart } from '@/features/cart';
import { useShopFilter, SHOP_CATEGORIES } from '@/features/shop';
import { MOCK_PRODUCTS } from '@/mocks/shop.mock';
import { ShopSidebar, ShopProductList, ShopProfilePanel } from '@/widgets/shop';
import { useShopPreview } from '@/features/shop/model/useShopPreview';

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

  const { previewItems, wearItem, resetPreview } = useShopPreview();

  const processedProducts = useMemo(() => {
    const targetCategoryLabel = SHOP_CATEGORIES[activeCategory];

    const filtered = MOCK_PRODUCTS.filter(
      (item) => item.subCategory === targetCategoryLabel,
    );

    switch (activeSort) {
      case 'COST':
        return filtered.sort((a, b) => a.price - b.price);

      case 'LEVEL':
        return filtered.sort((a, b) => a.level - b.level);

      case 'POPULAR':
      default:
        return filtered;
    }
  }, [activeCategory, activeSort]);

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
        products={processedProducts}
        cart={cart}
        onAddToCart={addToCart}
        onWearItem={wearItem}
      />

      <ShopProfilePanel
        cart={cart}
        previewItems={previewItems}
        onRemoveFromCart={removeFromCart}
        onResetPreview={resetPreview}
      />
    </div>
  );
};

export default ShopPage;
