import { useEffect, useMemo, useState } from 'react';

import type { FriendProfile, FriendRelation } from '@/entities/friend';

interface Friend extends FriendProfile {
  relation: FriendRelation;
}

const RELATION_PRIORITY: Record<FriendRelation, number> = {
  REQUEST_RECEIVED: 1,
  REQUEST_SENT: 2,
  FRIEND: 3,
  BLOCKED: 5,
};

const DUMMY_DATA: Friend[] = [
  {
    userId: 1,
    nickname: '차단한사람#1111',
    level: 10,
    relation: 'BLOCKED',
    isOnline: false,
    outfit: undefined,
  },
  {
    userId: 2,
    nickname: '짱친#1234',
    level: 60,
    relation: 'FRIEND',
    isOnline: true,
    outfit: undefined,
  },
  {
    userId: 3,
    nickname: '친구신청받아#5555',
    level: 1,
    relation: 'REQUEST_RECEIVED',
    isOnline: true,
    outfit: undefined,
  },
  {
    userId: 4,
    nickname: '내가신청보냄#7777',
    level: 25,
    relation: 'REQUEST_SENT',
    isOnline: false,
    outfit: undefined,
  },
  {
    userId: 5,
    nickname: '자러감#9999',
    level: 40,
    relation: 'FRIEND',
    isOnline: false,
    outfit: undefined,
  },
];

export const useFriendList = (searchKeyword: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState<Friend[]>([]);

  const acceptFriend = (targetId: number | string) => {
    setFriends((prev) =>
      prev.map((f) =>
        f.userId === targetId ? { ...f, relation: 'FRIEND' } : f,
      ),
    );
  };

  const removeFriend = (targetId: number | string) => {
    setFriends((prev) => prev.filter((f) => f.userId !== targetId));
  };

  const blockFriend = (targetId: number | string) => {
    setFriends((prev) =>
      prev.map((f) =>
        f.userId === targetId ? { ...f, relation: 'BLOCKED' } : f,
      ),
    );
  };

  const processedFriends = useMemo(() => {
    const filtered = friends.filter((friend) =>
      friend.nickname.toLowerCase().includes(searchKeyword.toLowerCase()),
    );

    return [...filtered].sort((a, b) => {
      const getPriority = (friend: Friend) => {
        if (friend.relation === 'FRIEND') return friend.isOnline ? 3 : 4;
        return RELATION_PRIORITY[friend.relation] ?? 99;
      };

      const priorityDiff = getPriority(a) - getPriority(b);

      return priorityDiff !== 0
        ? priorityDiff
        : a.nickname.localeCompare(b.nickname);
    });
  }, [searchKeyword, friends]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(DUMMY_DATA);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    processedFriends,
    acceptFriend,
    removeFriend,
    blockFriend,
    isLoading,
  };
};
