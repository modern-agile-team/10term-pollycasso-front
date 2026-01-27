import { useState } from 'react';
import { SORT_OPTIONS } from '../constants/shop.constants';
import type { SortType } from './types';

export const useShopFilter = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState<SortType>('POPULAR');

  const toggleSortOpen = () => {
    setIsSortOpen((prev) => !prev);
  };

  const handleSortChange = (optionKey: SortType) => {
    setActiveSort(optionKey);
    setIsSortOpen(false);
  };

  const activeSortLabel = SORT_OPTIONS[activeSort];

  return {
    isSortOpen,
    activeSort,
    activeSortLabel,
    toggleSortOpen,
    handleSortChange,
  };
};
