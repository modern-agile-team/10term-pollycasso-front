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
    const filtered = friends.filter((friend) => {
      if (!searchKeyword) return true;
      return friend.nickname
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
    });

    return [...filtered].sort((a, b) => {
      const getPriority = (f: Friend) => {
        if (f.relation === 'FRIEND') return f.isOnline ? 3 : 4;
        return RELATION_PRIORITY[f.relation] ?? 99;
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
