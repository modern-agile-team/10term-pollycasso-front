import { create } from 'zustand';
import type { CreateRoomForm } from '../lib/validators';

interface CreateRoomModalStore {
  isOpen: boolean;
  mode: 'CREATE' | 'EDIT';
  initialData: CreateRoomForm | null;
  open: (mode?: 'CREATE' | 'EDIT', data?: CreateRoomForm | null) => void;
  close: () => void;
}

export const useCreateRoomModalStore = create<CreateRoomModalStore>((set) => ({
  isOpen: false,
  mode: 'CREATE',
  initialData: null,

  open: (mode = 'CREATE', data = null) =>
    set({
      isOpen: true,
      mode,
      initialData: data ?? null,
    }),

  close: () =>
    set({
      isOpen: false,
      mode: 'CREATE',
      initialData: null,
    }),
}));
