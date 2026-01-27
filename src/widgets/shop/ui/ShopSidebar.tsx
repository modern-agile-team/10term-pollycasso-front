import { cn } from '@/shared/lib';
import {
  useShopFilter,
  SORT_MENU_LIST,
  SHOP_CATEGORIES,
} from '@/features/shop';

export const ShopSidebar = () => {
  const {
    isSortOpen,
    activeSortLabel,
    activeSort,
    toggleSortOpen,
    handleSortChange,
  } = useShopFilter();

  return (
    <div className="flex flex-col justify-between w-[180px] h-[720px]">
      <div className="relative w-full z-50">
        <button
          onClick={toggleSortOpen}
          className="w-full h-[67.5px] bg-[#2a4718] hover:bg-[#1E3411] text-white text-[27px] rounded-[20px] hover:brightness-110 transition-all flex items-center justify-center"
        >
          {activeSortLabel} ▽
        </button>

        {isSortOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-[#FEFEFE] rounded-[20px] shadow-lg overflow-hidden flex flex-col py-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* ex: 'POPULAR', '인기순' */}
            {SORT_MENU_LIST.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleSortChange(key)}
                className={cn(
                  'w-full py-3 text-[20px] text-[#656565] hover:bg-gray-100 transition-colors',
                  activeSort === key && 'text-black font-extrabold bg-gray-50',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col w-full h-[630px] bg-[#1E3411]/40 rounded-[25px] overflow-hidden text-[31.5px]">
        {Object.values(SHOP_CATEGORIES).map((label, index) => (
          <button
            key={label}
            className={cn(
              'flex-1 text-white hover:bg-[#1E3411]/20 transition-colors hover:text-[#FFD966]',
              index !== 0 && 'border-t border-[#1E3411]/20',
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
