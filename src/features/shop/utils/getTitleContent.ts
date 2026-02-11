import type { PurchaseStatus } from '../model/types';

export const getTitleContent = (status: PurchaseStatus) => {
  switch (status) {
    case 'SUCCESS':
      return { text: '구매 성공!', color: 'text-[#50CC43]' };
    case 'FAIL_BALANCE':
    case 'FAIL_LEVEL':
      return { text: '구매 실패', color: 'text-[#FF5050]' };
    default:
      return { text: '구매하시겠습니까?', color: 'text-black' };
  }
};
