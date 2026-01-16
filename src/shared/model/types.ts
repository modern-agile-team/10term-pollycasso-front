export interface Friend {
  id: string;
  name: string;
}

export type ChannelType = '전체' | '친구' | '안내';

export interface ChatMessage {
  id: string;
  createdAt: string;
  senderId: string;
  nickname: string;
  message: string;
  channel: '전체' | '친구' | '안내';
  targetId?: string;
  targetNickname?: string;
}

export interface SendMessageRequest {
  message: string;
  channel?: '전체' | '친구' | '안내';
  targetNickname?: string;
  targetId?: string;
}
