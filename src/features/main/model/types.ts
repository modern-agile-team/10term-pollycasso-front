export type GameMode = 'SOLO' | 'TEAM';

export interface Room {
  id: number;
  name: string;
  mode: GameMode;
  maxPlayers: number;
  currentPlayers: number;
  isPrivate: boolean;
  status: 'WAITING' | 'IN_PROGRESS';
}

export interface Friend {
  id: number;
  name: string;
}

export interface ChatMessage {
  channel: '전체' | '친구';
  text: string;
  targetNickname?: string;
}
