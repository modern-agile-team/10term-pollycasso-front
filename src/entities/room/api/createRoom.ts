import { instance } from '@/shared/api';
import type { CreateRoomPayload, Room } from '../model/types';

export const createRoom = async (data: CreateRoomPayload): Promise<Room> => {
  const response = await instance.post<Room>('rooms', data);
  return response.data;
};
