import { useState } from 'react';
import { SORT_OPTIONS } from '../constants/shop.constants';
import type { CategoryType, SortType } from './types';

export const useShopFilter = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState<SortType>('POPULAR');
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>('ACCESSORY');

  const toggleSortOpen = () => {
    setIsSortOpen((prev) => !prev);
  };

  const handleSortChange = (optionKey: SortType) => {
    setActiveSort(optionKey);
    setIsSortOpen(false);
  };

  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
  };

  const activeSortLabel = SORT_OPTIONS[activeSort];

  return {
    isSortOpen,
    activeSort,
    activeSortLabel,
    activeCategory,
    toggleSortOpen,
    handleSortChange,
    handleCategoryChange,
  };
};
