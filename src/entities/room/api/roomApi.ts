import { instance } from '@/shared/api/axios';
import type {
  Room,
  CreateRoomPayload,
  RoomFilters,
} from '@/entities/room/model/types';

interface GetRoomsResponse {
  data: Room[];
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

export const createRoom = async (data: CreateRoomPayload): Promise<Room> => {
  const response = await instance.post<Room>('rooms', data);
  return response.data;
};
