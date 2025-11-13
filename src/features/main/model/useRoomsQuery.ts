import { useInfiniteQuery } from '@tanstack/react-query';
import { roomQueries } from '@/entities/room/queries/roomQueries';
import { useRoomFilterStore } from './useRoomFilterStore';
import { useSearchStore } from './useSearchStore';
import type { RoomFilter } from '@/features/main/constants/filters';
import type { RoomFilters } from '@/entities/room/model/types';

const translateFilterToParams = (filter: RoomFilter): RoomFilters => {
  if (filter === '대기') return { status: 'WAITING' };
  if (filter === '개인') return { mode: 'SOLO' };
  if (filter === '팀') return { mode: 'TEAM' };
  return {};
};

export const useRoomsQuery = () => {
  const { selectedFilter } = useRoomFilterStore();
  const { commitSearch } = useSearchStore();

  const apiFilters: RoomFilters = {
    ...translateFilterToParams(selectedFilter),
    name: commitSearch.trim() || undefined,
  };

  const queryOptions = roomQueries.list(apiFilters);

  return useInfiniteQuery(queryOptions);
};
