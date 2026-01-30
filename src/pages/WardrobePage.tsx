import { useEffect, useMemo } from 'react';
import { CharacterPreview } from '@/entities/character';
import { useShopPreview } from '@/features/shop';
import { MOCK_PRODUCTS } from '@/mocks/shop.mock';
import { WardrobeProductList } from '@/widgets/wardrobe';
import {
  useWardrobeFilter,
  WARDROBE_ITEM_CATEGORIES,
} from '@/widgets/wardrobe';
import { cn } from '@/shared/lib';
import { useGameSocket } from '@/shared/api/socket/GameSocketProvider';
import { useNudgeListener } from '@/features/lobby/model/useNudgeListener';

const USER_LEVEL = 3;

const WardrobePage = () => {
  const { gameSocket } = useGameSocket();
  useNudgeListener();

  useEffect(() => {
    if (!gameSocket) return;

    gameSocket.emit('room:updateStatus', { status: 'CUSTOMIZING' });

    return () => {
      gameSocket.emit('room:updateStatus', { status: 'IDLE' });
    };
  }, [gameSocket]);

  const { previewItems, resetPreview, wearItem } = useShopPreview();

  const {
    activeTab,
    itemCategory,
    isDropdownOpen,
    currentFilterLabel,
    itemButtonLabel,
    handleTabChange,
    toggleDropdown,
    handleCategorySelect,
  } = useWardrobeFilter();

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(
      (item) => item.subCategory === currentFilterLabel,
    );
  }, [currentFilterLabel]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen gap-[24px] font-ssrm font-bold">
      <div className="flex flex-col gap-y-5 w-[500px] h-[720px] rounded-[30px] bg-[#1E3411]/40 shadow-inner p-6">
        <CharacterPreview
          level={USER_LEVEL}
          previewItems={previewItems}
          showResetButton={false}
          classNames={{
            container: 'w-full h-[575px]',
            shadow: 'top-[380px]',
            header: 'h-[60px]',
            levelIcon: 'w-[60px] h-[60px]',
            levelText: 'text-xl',
            nicknameText: 'text-2xl',
          }}
        />

        <div className="flex justify-between rounded-xl text-3xl p-1.5">
          <button
            onClick={resetPreview}
            className="flex-1 py-3 rounded-full bg-[#2D2D2D] text-white hover:bg-black/90 transition-colors mr-2"
          >
            초기화
          </button>
          <button className="flex-1 py-3 rounded-full bg-[#EF5F52] text-white hover:bg-[#d64538] transition-colors">
            확인
          </button>
        </div>
      </div>

      <div className="flex flex-col w-[900px] h-[720px] rounded-[30px] bg-[#1E3411]/40 shadow-inner overflow-visible">
        <div className="flex items-center w-full h-1/5 gap-x-9 text-3xl relative z-50">
          <div className="relative ml-10">
            <button
              onClick={toggleDropdown}
              className={cn(
                'w-[370px] h-[60px] rounded-[20px] transition-colors flex items-center justify-center gap-2',
                activeTab === 'ITEM'
                  ? 'bg-[#2D2D2D] text-white'
                  : 'bg-black hover:bg-[#2D2D2D] text-white',
              )}
            >
              {itemButtonLabel} <span className="text-sm">▼</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-full bg-[#2D2D2D] rounded-[20px] overflow-hidden shadow-xl flex flex-col z-50 animate-in fade-in zoom-in-95 duration-200">
                {WARDROBE_ITEM_CATEGORIES.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => handleCategorySelect(category.key as any)}
                    className={cn(
                      'w-full py-4 text-2xl hover:bg-black/40 transition-colors text-left pl-10',
                      itemCategory === category.key
                        ? 'font-black'
                        : 'text-white',
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleTabChange('SKILL')}
            className={cn(
              'w-[370px] h-[60px] rounded-[20px] transition-colors',
              activeTab === 'SKILL'
                ? 'bg-[#2D2D2D] text-white'
                : 'bg-black hover:bg-[#2D2D2D] text-white',
            )}
          >
            기술
          </button>
        </div>

        <div className="flex-1 w-full overflow-hidden pr-8 rounded-[20px] z-0">
          <WardrobeProductList
            products={filteredProducts}
            equippedItems={previewItems}
            onWearItem={wearItem}
          />
        </div>
      </div>
    </div>
  );
};

export default WardrobePage;
