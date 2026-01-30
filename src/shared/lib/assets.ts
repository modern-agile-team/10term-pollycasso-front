const CDN_URL = import.meta.env.VITE_ASSET_CDN_URL;

// 상점/인벤토리에서 보여줄 상품 이미지
export const getShopItemUrl = (itemId: string) => {
  return `${CDN_URL}/${itemId}.svg?tr=orig`;
};

// 캐릭터가 실제로 입을 착용 이미지
export const getOutfitItemUrl = (itemId: string) => {
  return `${CDN_URL}/outfit_${itemId}.svg?tr=orig`;
};
