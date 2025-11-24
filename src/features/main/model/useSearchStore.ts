import { create } from 'zustand';

interface SearchStore {
  searchQuery: string;
  commitSearch: string;
  setSearchQuery: (query: string) => void;
  setCommitSearch: (query: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: '',
  commitSearch: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCommitSearch: (query) => set({ commitSearch: query }),
}));
