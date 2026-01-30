import { useEffect } from 'react';
import { useGameSocket } from '@/shared/api/socket/GameSocketProvider';

import { useCart } from '@/features/cart';
import {
  useShopFilter,
  useShopPreview,
  useProductSorting,
} from '@/features/shop';
import { ShopSidebar, ShopProductList, ShopProfilePanel } from '@/widgets/shop';
import { useNudgeListener } from '@/features/lobby/model/useNudgeListener';

const ShopPage = () => {
  const { gameSocket } = useGameSocket();
  useNudgeListener();

  useEffect(() => {
    if (!gameSocket) return;

    gameSocket.emit('room:updateStatus', { status: 'SHOPPING' });

    return () => {
      gameSocket.emit('room:updateStatus', { status: 'IDLE' });
    };
  }, [gameSocket]);

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

  const processedProducts = useProductSorting(activeCategory, activeSort);

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
