import type { Room, RoomFilters } from '@/entities/room/model';
import { instance } from '@/shared';

interface GetRoomsResponse {
  rooms: Room[];
  hasNextPage: boolean;
  nextCursor: number | null;
}

export const getRooms = async (
  params: RoomFilters & { cursor?: number },
): Promise<GetRoomsResponse> => {
  const response = await instance.get<GetRoomsResponse>('rooms', {
    params,
  });
  return response.data;
};
