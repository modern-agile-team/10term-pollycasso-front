export interface User {
  id: string;
  nickname: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (data: { user: User; accessToken: string }) => void;
  clearAuth: () => void;
}
