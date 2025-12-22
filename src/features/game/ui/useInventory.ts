import { useMemo, useState } from 'react';
import type { GameItem } from '@/entities/game/model/types';
import { ALL_ITEMS_META, GAME_CONFIG } from '@/features/game/constants/game';

export const useInventory = (inventory: GameItem[]) => {
  const [startIndex, setStartIndex] = useState(0);

  const processedItems = useMemo(() => {
    const inventoryMap = new Map(inventory.map((item) => [item.itemId, item]));

    return ALL_ITEMS_META.map((meta) => {
      const myItem = inventoryMap.get(meta.id);
      const count = myItem?.count || 0;

      return {
        ...meta,
        count,
        cooldownEndsAt: myItem?.cooldownEndsAt || 0,
        isOwned: count > 0,
      };
    });
  }, [inventory]);

  const visibleItems = processedItems.slice(
    startIndex,
    startIndex + GAME_CONFIG.ITEMS_PER_PAGE,
  );

  const canPrev = startIndex > 0;
  const canNext =
    startIndex + GAME_CONFIG.ITEMS_PER_PAGE < processedItems.length;

  const handlePrev = () => {
    if (canPrev) setStartIndex((prev) => prev - 1);
  };
  const handleNext = () => {
    if (canNext) setStartIndex((prev) => prev + 1);
  };

  return { visibleItems, handlePrev, handleNext, canPrev, canNext };
};
