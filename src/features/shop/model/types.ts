import { SHOP_CATEGORIES, SORT_OPTIONS } from '../constants/shop.constants';

export type SortType = keyof typeof SORT_OPTIONS;
export type CategoryType = keyof typeof SHOP_CATEGORIES;
