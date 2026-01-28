import type { Outfit } from '@/shared/model';

export interface User {
  id: number;
  nickname: string;
  tag: string;
  // TODO: 백엔드 미구현
  level?: number;
  currentExp?: number;
  outfit?: Outfit;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (data: {
    user: Pick<User, 'id' | 'nickname' | 'tag'>;
    accessToken: string;
  }) => void;
  updateUser: (data: Partial<User>) => void;
  updateOutfit: (outfit: Partial<Outfit>) => void;
  clearAuth: () => void;
}
