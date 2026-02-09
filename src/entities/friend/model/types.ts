import type { Outfit } from '@/shared/model';

export type FriendRelation =
  | 'FRIEND'
  | 'REQUEST_SENT'
  | 'REQUEST_RECEIVED'
  | 'BLOCKED';

export interface FriendProfile {
  userId: number | string;
  nickname: string;
  outfit: Outfit;
  level: number;
  tag: string;
  isOnline: boolean;
}

export type FriendAction =
  | 'ACCEPT'
  | 'CANCEL'
  | 'REJECT'
  | 'DELETE'
  | 'BLOCK'
  | 'UNBLOCK';
