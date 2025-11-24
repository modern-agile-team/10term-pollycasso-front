import { instance } from '@/shared/api/axios';
import type { Room, CreateRoomPayload } from '@/entities/room/model/types';

export const createRoom = async (data: CreateRoomPayload): Promise<Room> => {
  const response = await instance.post<Room>('rooms', data);
  return response.data;
};
