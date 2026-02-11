import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { getConsumables } from '../api/getConsumables';
import { getCosmetics } from '../api/getCosmetics';
import { getUserInventory } from '../api/getUserInventory';
import { postPurchase } from '../api/postPurchase';

export const shopQueries = {
  all: () => ['shop'] as const,

  consumables: () =>
    queryOptions({
      queryKey: [...shopQueries.all(), 'consumables'] as const,
      queryFn: getConsumables,
    }),

  cosmetics: () =>
    queryOptions({
      queryKey: [...shopQueries.all(), 'cosmetics'] as const,
      queryFn: getCosmetics,
    }),

  inventory: () =>
    queryOptions({
      queryKey: [...shopQueries.all(), 'inventory'] as const,
      queryFn: getUserInventory,
    }),

  purchase: () =>
    mutationOptions({
      mutationKey: [...shopQueries.all(), 'purchase'] as const,
      mutationFn: postPurchase,
    }),
};
