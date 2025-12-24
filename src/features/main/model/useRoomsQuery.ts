import { useInfiniteQuery } from '@tanstack/react-query';

import type { RoomFilters } from '@/entities/room';
import { roomQueries } from '@/entities/room';
import type { RoomFilter } from '../constants/filters';
import { useRoomFilterStore } from './useRoomFilterStore';
import { useSearchStore } from './useSearchStore';

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
    q: commitSearch.trim() || undefined,
  };

  const queryOptions = roomQueries.list(apiFilters);

  return useInfiniteQuery(queryOptions);
};
