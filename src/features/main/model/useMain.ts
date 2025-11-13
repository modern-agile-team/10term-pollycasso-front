import { useState } from 'react';
import type { RoomFilter } from '../constants/filters';

export const useMain = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roomFilter, setRoomFilter] = useState<RoomFilter>('전체');
  const [commitSearch, setCommitSearch] = useState('');

  return {
    searchQuery,
    setSearchQuery,
    roomFilter,
    setRoomFilter,
    commitSearch,
    setCommitSearch,
  };
};
