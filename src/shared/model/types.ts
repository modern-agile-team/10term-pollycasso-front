export interface Friend {
  id: string;
  name: string;
}

export type ChatChannel = 'global' | 'direct' | 'system';

export interface ChatMessage {
  id: string;
  createdAt: string;
  senderId: string;
  nickname: string;
  message: string;
  channel: ChatChannel;
  targetId?: string;
  targetNickname?: string;
}

export interface SendMessageRequest {
  message: string;
  channel?: Exclude<ChatChannel, 'system'>;
  targetNickname?: string;
  targetId?: string;
}
