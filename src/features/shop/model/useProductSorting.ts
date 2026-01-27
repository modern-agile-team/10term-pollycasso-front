import { useMemo } from 'react';
import { MOCK_PRODUCTS } from '@/mocks/shop.mock';
import type { CategoryType, SortType } from '../model/types';
import { SHOP_CATEGORIES } from '@/features/shop';

export const useProductSorting = (
  activeCategory: CategoryType,
  activeSort: SortType,
) => {
  return useMemo(() => {
    const targetCategoryLabel = SHOP_CATEGORIES[activeCategory];

    const filtered = MOCK_PRODUCTS.filter(
      (item) => item.subCategory === targetCategoryLabel,
    );

    switch (activeSort) {
      case 'COST':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'LEVEL':
        return [...filtered].sort((a, b) => a.level - b.level);
      case 'POPULAR':
      default:
        return filtered;
    }
  }, [activeCategory, activeSort]);
};
