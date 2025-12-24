import { cn } from '@/shared/lib';
import { ROOM_FILTER_COLORS, ROOM_FILTERS } from '../../constants/filters';
import { useRoomFilterStore } from '../../model/useRoomFilterStore';

export const RoomFilterTabs = () => {
  const { selectedFilter, setFilter } = useRoomFilterStore();

  return (
    <div className="flex ml-5 p-1 gap-x-1 w-[305px] bg-white/20 rounded-xl">
      {ROOM_FILTERS.map((filter) => {
        const isSelected =
          selectedFilter === '전체' || selectedFilter === filter;

        const buttonColorClassName = isSelected
          ? ROOM_FILTER_COLORS[filter]
          : 'bg-[#464646]';

        return (
          <button
            key={filter}
            onClick={() => setFilter(filter)}
            className={cn(
              'px-4 rounded-lg text-white text-2xl font-bold',
              buttonColorClassName,
            )}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};
