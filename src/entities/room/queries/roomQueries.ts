import { infiniteQueryOptions, mutationOptions } from '@tanstack/react-query';

import { createRoom } from '../api/createRoom';
import { getRooms } from '../api/getRooms';
import type { RoomFilters } from '../model/types';

export const roomQueries = {
  rooms: () => ['rooms'] as const,

  list: (filters: RoomFilters) =>
    infiniteQueryOptions({
      queryKey: [...roomQueries.rooms(), 'list', filters] as const,
      queryFn: ({ pageParam }) => getRooms({ ...filters, cursor: pageParam }),

      initialPageParam: undefined as number | undefined,

      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.nextCursor : undefined,
    }),

  create: () =>
    mutationOptions({
      mutationKey: [...roomQueries.rooms(), 'create'] as const,
      mutationFn: createRoom,
    }),
};
