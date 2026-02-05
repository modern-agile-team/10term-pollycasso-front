import { create } from 'zustand';
import { Socket } from 'socket.io-client';
import type { FriendProfile } from './types';

interface FriendStore {
  friends: FriendProfile[];
  recommendedFriends: FriendProfile[];
  searchResults: FriendProfile[];
  isLoading: boolean;

  setFriends: (friends: FriendProfile[]) => void;
  setRecommended: (friends: FriendProfile[]) => void;
  setSearchResults: (results: FriendProfile[]) => void;
  setLoading: (loading: boolean) => void;

  initListeners: (socket: Socket) => void;
}

export const useFriendStore = create<FriendStore>((set) => ({
  friends: [],
  recommendedFriends: [],
  searchResults: [],
  isLoading: true,

  setFriends: (friends) => set({ friends, isLoading: false }),
  setRecommended: (recommendedFriends) => set({ recommendedFriends }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setLoading: (isLoading) => set({ isLoading }),

  initListeners: (socket: Socket) => {
    if (!socket) return;

    const SYNC_EVENTS = [
      'friends:statusUpdated',
      'friends:requestSend',
      'friends:requestAccept',
      'friends:delete',
      'friends:block',
    ];

    SYNC_EVENTS.forEach((event) => socket.off(event));
    socket.off('friends:getList');
    socket.off('friends:getRecommendedList');
    socket.off('friends:search');

    socket.on('friends:getList', (data) => {
      set({ friends: data, isLoading: false });
    });

    socket.on('friends:getRecommendedList', (data) => {
      set({ recommendedFriends: data });
    });

    socket.on('friends:search', (data) => {
      set({ searchResults: data });
    });

    SYNC_EVENTS.forEach((event) => {
      socket.on(event, () => {
        socket.emit('friends:getList');
      });
    });
  },
}));
