import { useState } from 'react';

export const useMain = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roomFilter, setRoomFilter] = useState<'전체' | '대기' | '개인' | '팀'>(
    '전체',
  );
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
