import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from './types';

const initialState = {
  user: null,
  accessToken: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: ({ user, accessToken }) => set({ user, accessToken }),
      clearAuth: () => set(initialState),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
