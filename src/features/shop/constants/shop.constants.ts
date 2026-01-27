export const SORT_OPTIONS = {
  POPULAR: '인기순',
  LEVEL: '레벨순',
  COST: '코인순',
} as const;

export const SORT_MENU_LIST = [
  { key: 'POPULAR', label: '인기순' },
  { key: 'LEVEL', label: '레벨순' },
  { key: 'COST', label: '코인순' },
] as const;

export const SHOP_CATEGORIES = {
  SKILL: '기술',
  BIRD: '새',
  TOP: '상의',
  BOTTOM: '하의',
  HAT: '모자',
  SHOES: '신발',
  ACCESSORY: '악세사리',
} as const;
