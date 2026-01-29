import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from './types';
import type { Outfit } from '@/shared/model';

const defaultOutfit: Outfit = {
  bird: 'bird_01',
  accessory: null,
  hat: null,
  top: null,
  bottom: null,
  shoes: null,
  effect: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setAuth: ({ user, accessToken }) =>
        set({
          user: {
            ...user,
            coin: 619,
            level: 1,
            currentExp: 0,
            outfit: defaultOutfit,
          },
          accessToken: accessToken,
        }),

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      // 특정 부위의 옷만 바꿀 때 사용 (예: 모자만 착용)
      updateOutfit: (newOutfit) =>
        set((state) => {
          if (!state.user) return state;

          return {
            user: {
              ...state.user,
              outfit: {
                ...state.user.outfit,
                ...newOutfit,
              } as Outfit,
            },
          };
        }),

      clearAuth: () => set({ user: null, accessToken: null }),
    }),
    { name: 'auth-storage' },
  ),
);
