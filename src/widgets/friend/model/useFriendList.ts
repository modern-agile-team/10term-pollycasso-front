import { useMemo, useState } from 'react';

import type { FriendRelation } from '@/entities/friend';

const DUMMY_DATA = [
  {
    id: 1,
    nickname: '차단한사람#1111',
    level: 10,
    relation: 'BLOCKED',
    isOnline: false,
  },
  {
    id: 2,
    nickname: '짱친#1234',
    level: 60,
    relation: 'FRIEND',
    isOnline: true,
  },
  {
    id: 3,
    nickname: '친구신청받아#5555',
    level: 1,
    relation: 'REQUEST_RECEIVED',
    isOnline: true,
  },
  {
    id: 4,
    nickname: '내가신청보냄#7777',
    level: 25,
    relation: 'REQUEST_SENT',
    isOnline: false,
  },
  {
    id: 5,
    nickname: '자러감#9999',
    level: 40,
    relation: 'FRIEND',
    isOnline: false,
  },
] as const;

export const useFriendList = (searchKeyword: string) => {
  const [friends, setFriends] = useState<any[]>(DUMMY_DATA as any);

  const acceptFriend = (id: number) => {
    setFriends((prev) =>
      prev.map((f) => (f.id === id ? { ...f, relation: 'FRIEND' } : f)),
    );
  };

  const removeFriend = (id: number) => {
    setFriends((prev) => prev.filter((f) => f.id !== id));
  };

  const blockFriend = (id: number) => {
    setFriends((prev) =>
      prev.map((f) => (f.id === id ? { ...f, relation: 'BLOCKED' } : f)),
    );
  };

  const processedFriends = useMemo(() => {
    const filtered = friends.filter((friend) => {
      if (!searchKeyword) return true;
      return friend.nickname
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
    });

    return filtered.sort((a, b) => {
      const getPriority = (relation: FriendRelation, isOnline: boolean) => {
        switch (relation) {
          case 'REQUEST_RECEIVED':
            return 1;
          case 'REQUEST_SENT':
            return 2;
          case 'FRIEND':
            return isOnline ? 3 : 4;
          case 'BLOCKED':
            return 5;
          default:
            return 99;
        }
      };
      const priorityA = getPriority(a.relation, a.isOnline);
      const priorityB = getPriority(b.relation, b.isOnline);

      if (priorityA !== priorityB) return priorityA - priorityB;
      return a.nickname.localeCompare(b.nickname);
    });
  }, [searchKeyword, friends]);

  return {
    processedFriends,
    acceptFriend,
    removeFriend,
    blockFriend,
  };
};
