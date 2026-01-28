import { Receipt } from '@/assets';
import { cn } from '@/shared/lib';
import type { Product } from '@/entities/product';
import { getTitleContent } from '../utils/getTitleContent';
import { useShopPurchase } from '../model/useShopPurchase';
import { PurchaseStatusContent } from './PurchaseStatusContent';

interface ShopPurchaseModalProps {
  onClose: () => void;
  items: Product[];
  totalPrice: number;
  userBalance: number;
  userLevel: number;
}

export const ShopPurchaseModal = (props: ShopPurchaseModalProps) => {
  const { onClose, items, totalPrice, userBalance } = props;

  const { status, handlePurchase, missingCost, missingLevel } =
    useShopPurchase(props);

  const { text: titleText, color: titleColor } = getTitleContent(status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-ssrm font-bold">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative z-10 w-[800px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center pt-[100px] px-16 z-20">
          <div className="flex flex-col items-center mb-4">
            <span className="text-[#535353] font-bold text-2xl">
              총 {items.length}개의 상품
            </span>
            <h2 className={cn('mt-1 text-5xl', titleColor)}>{titleText}</h2>
          </div>

          <div className="w-[90%] border-b-[3px] border-dashed border-black/80 my-2" />

          <div className="w-full flex flex-col items-center justify-center mt-6 mb-4 h-[260px]">
            <PurchaseStatusContent
              status={status}
              items={items}
              missingCost={missingCost}
              missingLevel={missingLevel}
            />
          </div>

          <div className="w-[90%] border-b-[3px] border-dashed border-black/80 my-4" />

          <div className="w-full flex justify-center text-3xl my-2 font-black text-black">
            <span className="ml-14">총 {totalPrice} coin</span>
            <span className="ml-12">
              내 코인:{' '}
              {status === 'SUCCESS' ? userBalance - totalPrice : userBalance}{' '}
              coin
            </span>
          </div>

          <div className="w-full flex justify-center gap-x-8 mt-2">
            {status === 'IDLE' ? (
              <>
                <button
                  onClick={onClose}
                  className="w-[200px] py-3 rounded-2xl bg-[#656565] text-white text-2xl hover:bg-[#555]"
                >
                  돌아가기
                </button>
                <button
                  onClick={handlePurchase}
                  className="w-[200px] py-3 rounded-2xl bg-[#52D843] text-white text-2xl hover:bg-[#46c239]"
                >
                  구매하기
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="w-[200px] py-3 rounded-2xl bg-[#656565] text-white text-2xl hover:bg-[#555]"
              >
                닫기
              </button>
            )}
          </div>
        </div>

        <img
          src={Receipt}
          alt="Receipt Background"
          className="w-[800px] object-contain select-none drop-shadow-2xl z-0"
        />
      </div>
    </div>
  );
};
