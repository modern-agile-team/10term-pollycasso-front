import { useMemo, useState } from 'react';

import type { GameItem, InventoryUIItem } from '@/shared/model';
import { ALL_ITEMS_META } from '../constants/game';

const ITEMS_PER_PAGE = 5;

export const useInventory = (inventory: GameItem[]) => {
  const [page, setPage] = useState(0);

  const processedItems = useMemo<InventoryUIItem[]>(() => {
    const inventoryMap = new Map(inventory.map((item) => [item.itemId, item]));

    return ALL_ITEMS_META.map((meta) => {
      const myItem = inventoryMap.get(String(meta.id));
      const count = myItem?.count || 0;

      return {
        ...meta,
        count,
        cooldownEndsAt: myItem?.cooldownEndsAt || 0,
        isOwned: count > 0,
      };
    });
  }, [inventory]);

  const maxPage = Math.max(
    0,
    Math.ceil(processedItems.length / ITEMS_PER_PAGE) - 1,
  );

  const visibleItems = processedItems.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  const handleNext = () => setPage((p) => Math.min(p + 1, maxPage));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));

  return {
    visibleItems,
    handleNext,
    handlePrev,
    canPrev: page > 0,
    canNext: page < maxPage,
  };
};
