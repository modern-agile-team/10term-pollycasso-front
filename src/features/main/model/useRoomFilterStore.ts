import { create } from 'zustand';

import type { RoomFilter } from '../constants/filters';

interface RoomFilterStore {
  selectedFilter: RoomFilter;
  setFilter: (filter: RoomFilter) => void;
}

export const useRoomFilterStore = create<RoomFilterStore>((set) => ({
  selectedFilter: '전체',
  setFilter: (filter) => set({ selectedFilter: filter }),
}));
