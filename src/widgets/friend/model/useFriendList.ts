import { useCallback, useEffect, useMemo, useState } from 'react';

import type {
  FriendAction,
  FriendProfile,
  FriendRelation,
} from '@/entities/friend';
import { io, SOCKET_EVENTS } from '@/shared/api/socket';

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
  const [recommendedFriends, setRecommendedFriends] = useState<FriendProfile[]>(
    [],
  );
  const [searchResults, setSearchResults] = useState<FriendProfile[]>([]);

  const socket = useMemo(() => io(import.meta.env.VITE_SOCKET_URL), []);

  useEffect(() => {
    const handleListResponse = (data: Friend[]) => {
      setFriends(data);
      setIsLoading(false);
    };

    const handleRecommendedResponse = (data: FriendProfile[]) => {
      setRecommendedFriends(data);
    };

    const handleSearchResponse = (data: FriendProfile[]) => {
      setSearchResults(data);
    };

    const handleStatusUpdate = ({
      userId,
      relation,
    }: {
      userId: number | string;
      relation: FriendRelation | 'NONE';
    }) => {
      setFriends((prev) => {
        if (relation === 'NONE') {
          return prev.filter((f) => f.userId !== userId);
        }
        return prev.map((f) =>
          f.userId === userId
            ? { ...f, relation: relation as FriendRelation }
            : f,
        );
      });
    };

    socket.on(SOCKET_EVENTS.FRIEND_GET_ALL_RESPONSE, handleListResponse);
    socket.on(SOCKET_EVENTS.FRIEND_STATUS_UPDATE, handleStatusUpdate);
    socket.on(
      SOCKET_EVENTS.FRIEND_GET_RECOMMENDED_RESPONSE,
      handleRecommendedResponse,
    );
    socket.on(SOCKET_EVENTS.FRIEND_SEARCH_RESPONSE, handleSearchResponse);

    socket.emit(SOCKET_EVENTS.FRIEND_GET_ALL);
    socket.emit(SOCKET_EVENTS.FRIEND_GET_RECOMMENDED);

    return () => {
      socket.off(SOCKET_EVENTS.FRIEND_GET_ALL_RESPONSE, handleListResponse);
      socket.off(SOCKET_EVENTS.FRIEND_STATUS_UPDATE, handleStatusUpdate);
      socket.off(
        SOCKET_EVENTS.FRIEND_GET_RECOMMENDED_RESPONSE,
        handleRecommendedResponse,
      );
      socket.off(SOCKET_EVENTS.FRIEND_SEARCH_RESPONSE, handleSearchResponse);
    };
  }, [socket]);

  const handleFriendAction = useCallback(
    (targetId: number | string, action: FriendAction) => {
      switch (action) {
        case 'ACCEPT':
          socket.emit(SOCKET_EVENTS.FRIEND_ACCEPT, { requesterId: targetId });
          break;

        case 'BLOCK':
          socket.emit(SOCKET_EVENTS.FRIEND_BLOCK, { targetId });
          break;

        case 'CANCEL':
        case 'REJECT':
        case 'DELETE':
        case 'UNBLOCK':
          socket.emit(SOCKET_EVENTS.FRIEND_DELETE, { targetId });
          break;

        default:
          console.warn('Unknown Friend Action:', action);
      }
    },
    [socket],
  );

  const requestFriend = useCallback(
    (targetNickname: string) => {
      socket.emit(SOCKET_EVENTS.FRIEND_REQUEST_SEND, { targetNickname });
    },
    [socket],
  );

  const refreshRecommended = useCallback(() => {
    socket.emit(SOCKET_EVENTS.FRIEND_GET_RECOMMENDED);
  }, [socket]);

  const searchUsers = useCallback(
    (keyword: string) => {
      if (!keyword.trim()) {
        setSearchResults([]);
        return;
      }
      socket.emit(SOCKET_EVENTS.FRIEND_SEARCH, { keyword });
    },
    [socket],
  );

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

  return {
    processedFriends,
    searchResults,
    recommendedFriends,
    handleFriendAction,
    requestFriend,
    searchUsers,
    refreshRecommended,
    isLoading,
  };
};
