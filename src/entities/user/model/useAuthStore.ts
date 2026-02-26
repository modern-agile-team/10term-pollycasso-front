import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from './types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setAuth: ({ user, accessToken }) =>
        set({
          user: { ...user },
          accessToken: accessToken,
        }),

      setProfile: (profileData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...profileData } : null,
        })),

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      updateOutfit: (newOutfit) =>
        set((state) => {
          if (!state.user || !state.user.outfit) return state;
          return {
            user: {
              ...state.user,
              outfit: { ...state.user.outfit, ...newOutfit },
            },
          };
        }),

      clearAuth: () => set({ user: null, accessToken: null }),
    }),
    { name: 'auth-storage' },
  ),
);
