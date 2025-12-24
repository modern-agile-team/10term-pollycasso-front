import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

import type { GameItem, InventoryUIItem } from '@/entities/game';
import { ItemIcon } from '@/entities/game';
import { cn } from '@/shared/lib';
import { COLORS } from '../constants/game';
import { useInventory } from './useInventory';

interface InventoryPanelProps {
  inventory: GameItem[] | null;
  onComplete?: () => void;
  completedCount?: number;
  totalCount?: number;
}

export const InventoryPanel = ({ inventory }: InventoryPanelProps) => {
  const { visibleItems, handlePrev, handleNext, canPrev, canNext } =
    useInventory(inventory ?? []);

  return (
    <aside className="h-auto flex flex-col gap-4">
      <div
        className="py-8 px-8 rounded-2xl flex flex-col gap-4 items-center justify-center min-w-[140px]"
        style={{ backgroundColor: COLORS.PRIMARY_DARK }}
      >
        <button
          onClick={handlePrev}
          disabled={!canPrev}
          className={cn(
            'transition-all p-1',
            canPrev
              ? 'text-white hover:text-green-200 hover:-translate-y-1'
              : 'text-white/30 cursor-not-allowed',
          )}
        >
          <ChevronUpIcon className="w-10 h-10 scale-x-125 stroke-[4px]" />
        </button>

        <div className="flex flex-col gap-6 my-2 h-[450px]">
          {visibleItems.map((item: InventoryUIItem) => (
            <ItemIcon
              key={item.id}
              id={item.id}
              name={item.name}
              imagePath={item.imagePath}
              effect={item.effect}
              count={item.count}
              isOwned={item.isOwned}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!canNext}
          className={cn(
            'transition-all p-1',
            canNext
              ? 'text-white hover:text-green-200 hover:translate-y-1'
              : 'text-white/30 cursor-not-allowed',
          )}
        >
          <ChevronDownIcon className="w-10 h-10 scale-x-125 stroke-[4px]" />
        </button>
      </div>
    </aside>
  );
};
