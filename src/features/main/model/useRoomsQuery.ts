import { useInfiniteQuery } from '@tanstack/react-query';
import { roomQueries } from '@/entities/room/queries/roomQueries';
import { useRoomFilterStore } from './useRoomFilterStore';
import type { RoomFilter } from '@/features/main/constants/filters';
import type { RoomFilters } from '@/entities/room/model/types';

const translateFilterToParams = (filter: RoomFilter): RoomFilters => {
  if (filter === '대기') return { status: 'WAITING' };
  if (filter === '개인') return { mode: 'SOLO' };
  if (filter === '팀') return { mode: 'TEAM' };

  return {};
};

export const useRoomsQuery = () => {
  // Zustand에서 가져오기
  const { selectedFilter } = useRoomFilterStore();
  // 매핑
  const apiFilters = translateFilterToParams(selectedFilter);
  // 쿼리 실행
  const queryOptions = roomQueries.list(apiFilters);

  return useInfiniteQuery(queryOptions);
};
