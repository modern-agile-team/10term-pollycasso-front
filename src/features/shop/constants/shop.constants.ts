export const SORT_OPTIONS = {
  POPULAR: '인기순',
  LEVEL: '레벨순',
  COST: '코인순',
} as const;

export const SORT_OPTIONS_LIST = [
  { key: 'POPULAR', label: '인기순' },
  { key: 'LEVEL', label: '레벨순' },
  { key: 'COST', label: '코인순' },
] as const;

export const SHOP_CATEGORIES = {
  ITEM: '기술',
  BIRD: '새',
  TOP: '상의',
  BOTTOM: '하의',
  HAT: '모자',
  SHOES: '신발',
  ACCESSORY: '액세서리',
  EFFECT: '효과',
} as const;

export const SHOP_CATEGORY_LIST = [
  { key: 'ITEM', label: '기술' },
  { key: 'BIRD', label: '새' },
  { key: 'TOP', label: '상의' },
  { key: 'BOTTOM', label: '하의' },
  { key: 'HAT', label: '모자' },
  { key: 'SHOES', label: '신발' },
  { key: 'ACCESSORY', label: '액세서리' },
  { key: 'EFFECT', label: '효과' },
] as const;

export const CATEGORY_TO_OUTFIT_KEY: Record<string, string> = {
  [SHOP_CATEGORIES.BIRD]: 'bird',
  [SHOP_CATEGORIES.TOP]: 'top',
  [SHOP_CATEGORIES.BOTTOM]: 'bottom',
  [SHOP_CATEGORIES.HAT]: 'hat',
  [SHOP_CATEGORIES.SHOES]: 'shoes',
  [SHOP_CATEGORIES.ACCESSORY]: 'accessory',
  [SHOP_CATEGORIES.EFFECT]: 'effect',
};
