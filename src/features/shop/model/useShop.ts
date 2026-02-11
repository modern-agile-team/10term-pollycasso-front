import { useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useWaitingSocket } from '@/shared/api/socket/WaitingSocketProvider';
import { useAuthStore } from '@/entities/user/model/useAuthStore';
import { useCart } from './useCart';
import type { CartItem } from './useCart';
import { shopQueries } from '../queries/shopQueries';
import { useShopFilter } from './useShopFilter';
import { useShopPreview } from './useShopPreview';
import { useProductSorting } from './useProductSorting';
import { SHOP_CATEGORIES } from '../constants/shop.constants';

export const useShop = () => {
  const queryClient = useQueryClient();
  const { waitingSocket } = useWaitingSocket();
  const { user, updateUser } = useAuthStore();

  const { data: myInventoryData } = useQuery(shopQueries.inventory());
  const { data: cosmeticsData } = useQuery(shopQueries.cosmetics());
  const { data: consumablesData } = useQuery(shopQueries.consumables());

  const myInventoryIds = myInventoryData?.inventoryIds || [];

  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const shopFilter = useShopFilter();
  const shopPreview = useShopPreview();

  const allProducts = useMemo(() => {
    const cosmetics = cosmeticsData?.items || [];
    const consumables = (consumablesData?.items || []).map(
      (item: CartItem) => ({
        ...item,
        subCategory: SHOP_CATEGORIES.ITEM,
      }),
    );
    return [...cosmetics, ...consumables];
  }, [cosmeticsData, consumablesData]);

  const processedProducts = useProductSorting(
    shopFilter.activeCategory,
    shopFilter.activeSort,
    allProducts,
  );

  const { mutate: purchase, isPending: isPurchasing } = useMutation({
    ...shopQueries.purchase(),
    onSuccess: (data) => {
      clearCart();
      if (data?.remainingCoins !== undefined) {
        updateUser({ coin: data.remainingCoins });
      }
      queryClient.invalidateQueries({ queryKey: shopQueries.all() });
    },
    onError: () => alert('구매에 실패했습니다.'),
  });

  const handlePurchase = () => {
    if (cart.length === 0) return;
    const payload = {
      cosmeticItems: cart
        .filter((item) => item.subCategory !== 'ITEM')
        .map((item) => item.id),
      gameItems: cart
        .filter((item) => item.subCategory === 'ITEM')
        .map((item) => ({ itemId: item.id, quantity: item.quantity })),
    };
    purchase(payload);
  };

  useEffect(() => {
    if (!waitingSocket) return;
    waitingSocket.emit('room:updateStatus', { status: 'SHOPPING' });
    return () => {
      waitingSocket.emit('room:updateStatus', { status: 'IDLE' });
    };
  }, [waitingSocket]);

  return {
    user,
    myInventoryIds,
    cart,
    addToCart,
    removeFromCart,
    shopFilter,
    shopPreview,
    processedProducts,
    handlePurchase,
    isPurchasing,
  };
};
