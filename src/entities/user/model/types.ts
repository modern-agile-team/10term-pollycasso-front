import type { Outfit } from '@/shared/model';

export interface User {
  id: number;
  nickname: string;
  tag: string;
  coin?: number;
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

  setProfile: (data: Partial<User>) => void;

  updateUser: (data: Partial<User>) => void;
  updateOutfit: (outfit: Partial<Outfit>) => void;
  clearAuth: () => void;
}
