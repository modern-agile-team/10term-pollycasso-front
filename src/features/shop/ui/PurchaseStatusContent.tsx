import { ReceiptItemCarousel } from './ReceiptItemCarousel';
import type { Product } from '@/entities/product';
import type { PurchaseStatus } from '../model/types';

interface PurchaseStatusContentProps {
  status: PurchaseStatus;
  items: Product[];
  missingCost: number;
  missingLevel: number;
}

export const PurchaseStatusContent = ({
  status,
  items,
  missingCost,
  missingLevel,
}: PurchaseStatusContentProps) => {
  if (status === 'IDLE') {
    return <ReceiptItemCarousel items={items} />;
  }

  if (status === 'SUCCESS') {
    return (
      <span className="text-4xl text-[#535353]">이제 옷장으로 가볼까요?</span>
    );
  }

  if (status === 'FAIL_BALANCE') {
    return (
      <div className="text-4xl text-[#535353] flex flex-col items-center gap-2">
        <p>
          <span className="text-[#FFCD4E] mr-2">{missingCost}코인</span>이
          부족해요.
        </p>
        <p>조금만 더 모아 볼까요?</p>
      </div>
    );
  }

  if (status === 'FAIL_LEVEL') {
    return (
      <div className="text-4xl text-[#535353] flex flex-col items-center gap-2">
        <p>
          <span className="text-[#FF5050] mr-2">{missingLevel}레벨</span>이
          부족해요!
        </p>
        <p>더 올리고 올까요?</p>
      </div>
    );
  }

  return null;
};
