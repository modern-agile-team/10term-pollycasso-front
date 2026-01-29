import { SHOP_CATEGORY_LIST } from '@/features/shop';

export const WARDROBE_ITEM_CATEGORIES = SHOP_CATEGORY_LIST.filter(
  (c) => c.key !== 'SKILL',
);
