import { useEffect } from 'react';
import { useWaitingSocket } from '@/shared/api/socket/WaitingSocketProvider';

import { useCart } from '@/features/cart';
import {
  useShopFilter,
  useShopPreview,
  useProductSorting,
} from '@/features/shop';
import { ShopSidebar, ShopProductList, ShopProfilePanel } from '@/widgets/shop';
import { useNudgeListener } from '@/features/lobby/model/useNudgeListener';
import { MOCK_TOTAL_PRODUCTS } from '@/mocks/shopData';
import { BackButton } from '@/shared/ui/BackButton';

const ShopPage = () => {
  const { waitingSocket } = useWaitingSocket();
  useNudgeListener();

  useEffect(() => {
    if (!waitingSocket) return;

    waitingSocket.emit('room:updateStatus', { status: 'SHOPPING' });

    return () => {
      waitingSocket.emit('room:updateStatus', { status: 'IDLE' });
    };
  }, [waitingSocket]);

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

  const processedProducts = useProductSorting(
    activeCategory,
    activeSort,
    MOCK_TOTAL_PRODUCTS,
  );

  const myInventoryIds = [101, 102, 201, 701];

  return (
    <div className="flex items-center justify-center w-full min-h-screen gap-[24px] font-ssrm font-bold">
      <BackButton />

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
        inventoryIds={myInventoryIds}
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
