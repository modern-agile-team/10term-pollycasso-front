import { useState } from 'react';
import { Receipt } from '@/assets';
import type { Product } from '@/entities/product';
import { ReceiptCard } from '@/entities/product';

interface ShopPurchaseModalProps {
  onClose: () => void;
  items: Product[];
  totalPrice: number;
  userBalance: number;
}

const ITEMS_PER_PAGE = 3;

export const ShopPurchaseModal = ({
  onClose,
  items,
  totalPrice,
  userBalance,
}: ShopPurchaseModalProps) => {
  const [page, setPage] = useState(0);
  const maxPage = Math.ceil(items.length / ITEMS_PER_PAGE) || 1;

  const currentItems = items.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(maxPage - 1, p + 1));

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
            <h2 className="text-black mt-1 text-5xl">구매하시겠습니까?</h2>
          </div>

          <div className="w-[90%] border-b-[3px] border-dashed border-black/80 my-2" />

          <div className="w-full flex flex-col items-center my-2 h-[260px]">
            <div className="flex items-center justify-between w-full px-4 h-full">
              <button
                onClick={handlePrev}
                disabled={page === 0}
                className="text-[#cecece] hover:text-gray-400 disabled:opacity-30 text-6xl font-black"
              >
                {'<'}
              </button>

              <div className="flex gap-x-4 w-[512px] justify-center">
                {currentItems.map((item) => (
                  <ReceiptCard key={item.id} product={item} />
                ))}
                {currentItems.length < ITEMS_PER_PAGE &&
                  Array.from({
                    length: ITEMS_PER_PAGE - currentItems.length,
                  }).map((_, index) => (
                    <div key={`empty-${index}`} className="w-[160px]" />
                  ))}
              </div>

              <button
                onClick={handleNext}
                disabled={page === maxPage - 1}
                className="text-[#cecece] hover:text-gray-400 disabled:opacity-30 text-6xl font-black"
              >
                {'>'}
              </button>
            </div>

            <div className="flex gap-x-2 mt-1">
              {Array.from({ length: maxPage }).map((_, index) => (
                <span
                  key={index}
                  className={`px-2 py-0.5 text-sm border border-[#BABABA] ${page === index ? 'border-gray-400 rounded text-gray-500' : 'text-gray-300'}`}
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </div>

          <div className="w-[90%] border-b-[3px] border-dashed border-black/80 my-4" />

          <div className="w-full flex justify-center text-3xl my-2 font-black text-black">
            <span className="ml-14">총 {totalPrice} coin</span>
            <span className="ml-12">내 코인: {userBalance} coin</span>
          </div>

          <div className="w-full flex justify-center gap-x-8 mt-6">
            <button
              onClick={onClose}
              className="w-[200px] py-3 rounded-2xl bg-[#656565] text-white text-2xl hover:bg-[#555]"
            >
              돌아가기
            </button>
            <button className="w-[200px] py-3 rounded-2xl bg-[#52D843] text-white text-2xl hover:bg-[#46c239]">
              구매하기
            </button>
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
