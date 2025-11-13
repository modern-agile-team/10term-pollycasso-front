import { create } from 'zustand';

interface CreateRoomModalStore {
  isOpen: boolean;

  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCreateRoomModalStore = create<CreateRoomModalStore>((set) => ({
  isOpen: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
