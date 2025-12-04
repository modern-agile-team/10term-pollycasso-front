export interface Friend {
  id: string;
  name: string;
}

export type Channel = '전체' | '친구' | '안내';

export interface ChatMessage {
  id: string;
  senderId: string;
  nickname: string;
  message: string;
  channel?: Channel;
  targetId?: string;
  targetNickname?: string;
}
