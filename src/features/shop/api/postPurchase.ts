import { instance } from '@/shared/api';

export interface PurchaseRequest {
  cosmeticItems: number[];
  gameItems: { itemId: number; quantity: number }[];
}

export interface PurchaseResponse {
  purchasedCosmeticItemIds: number[];
  purchasedGameItemIds: number[];
  remainingCoins: number;
}

export const postPurchase = async (
  payload: PurchaseRequest,
): Promise<PurchaseResponse> => {
  const { data } = await instance.post<PurchaseResponse>(
    '/shop/purchase',
    payload,
  );
  return data;
};
