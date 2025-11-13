import {
  ROOM_FILTER_COLORS,
  ROOM_FILTERS,
} from '@/features/main/constants/filters';
import type { RoomFilter } from '@/features/main/constants/filters';

interface RoomFilterTabsProps {
  currentFilter: RoomFilter;
  onChange: (filter: RoomFilter) => void;
}

export const RoomFilterTabs = ({
  currentFilter,
  onChange,
}: RoomFilterTabsProps) => {
  return (
    <div className="flex ml-5 p-1 gap-x-1 w-[305px] bg-white/20 rounded-xl">
      {ROOM_FILTERS.map((filter) => {
        const isAll = currentFilter === '전체';
        const isActive = currentFilter === filter;

        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`px-4 rounded-lg text-white text-2xl font-bold 
                ${
                  isAll
                    ? ROOM_FILTER_COLORS[filter]
                    : isActive
                      ? ROOM_FILTER_COLORS[filter]
                      : 'bg-[#464646]'
                }
              `}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};
