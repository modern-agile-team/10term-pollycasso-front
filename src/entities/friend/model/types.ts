export type FriendRelation =
  | 'FRIEND'
  | 'REQUEST_SENT'
  | 'REQUEST_RECEIVED'
  | 'BLOCKED';

export interface FriendProfile {
  userId: number | string;
  nickname: string;
  outfit?: string;
  level: number;
  isOnline: boolean;
}

export type FriendAction =
  | 'ACCEPT'
  | 'CANCEL'
  | 'REJECT'
  | 'DELETE'
  | 'BLOCK'
  | 'UNBLOCK';
