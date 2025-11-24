export interface Friend {
  id: number;
  name: string;
}

export type Channel = '전체' | '친구';

export interface ChatMessage {
  channel: Channel;
  text: string;
  targetNickname?: string;
}
