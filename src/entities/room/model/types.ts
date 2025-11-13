export type GameMode = 'SOLO' | 'TEAM';

export type RoomStatus = 'WAITING' | 'IN_PROGRESS';

export interface Room {
  id: number;
  name: string;
  mode: GameMode;
  maxPlayers: number;
  currentPlayers: number;
  isPrivate: boolean;
  status: RoomStatus;
}

export interface CreateRoomPayload {
  name: string;
  mode: GameMode;
  maxPlayers: number;
  isPrivate: boolean;
  password?: string;
}
