import { useState } from 'react';
import { ReceiptCard } from '@/entities/product';
import type { Product } from '@/entities/product';

const ITEMS_PER_PAGE = 3;

interface ReceiptItemCarouselProps {
  items: Product[];
}

export const ReceiptItemCarousel = ({ items }: ReceiptItemCarouselProps) => {
  const [page, setPage] = useState(0);
  const maxPage = Math.ceil(items.length / ITEMS_PER_PAGE) || 1;

  const currentItems = items.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  const handlePrev = () => setPage((page) => Math.max(0, page - 1));
  const handleNext = () => setPage((page) => Math.min(maxPage - 1, page + 1));

  return (
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
            Array.from({ length: ITEMS_PER_PAGE - currentItems.length }).map(
              (_, index) => (
                <div key={`empty-${index}`} className="w-[160px]" />
              ),
            )}
        </div>

        <button
          onClick={handleNext}
          disabled={page === maxPage - 1}
          className="text-[#cecece] hover:text-gray-400 disabled:opacity-30 text-6xl font-black"
        >
          {'>'}
        </button>
      </div>

      <div className="flex gap-x-2 mt-3">
        {Array.from({ length: maxPage }).map((_, index) => (
          <span
            key={index}
            className={`px-2 py-0.5 text-sm border border-[#BABABA] ${
              page === index
                ? 'border-gray-400 rounded text-gray-500'
                : 'text-gray-300'
            }`}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
};
