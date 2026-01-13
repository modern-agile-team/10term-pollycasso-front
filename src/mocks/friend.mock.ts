import type { FriendProfile, FriendRelation } from '@/entities/friend';
import { SOCKET_EVENTS } from '@/shared/api/socket';
import type { MockSocket } from '@/shared/api/socket/mockSocket';

export interface FriendWithRelation extends FriendProfile {
  relation: FriendRelation;
}

export const MOCK_FRIENDS: FriendWithRelation[] = [
  {
    userId: 1,
    nickname: '그림쟁이#1234',
    outfit: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Art',
    level: 25,
    isOnline: true,
    relation: 'FRIEND',
  },
  {
    userId: 2,
    nickname: '밤샘코딩#5678',
    outfit: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Code',
    level: 10,
    isOnline: false,
    relation: 'FRIEND',
  },
  {
    userId: 3,
    nickname: '친추주세요#1111',
    outfit: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Req',
    level: 5,
    isOnline: true,
    relation: 'REQUEST_RECEIVED',
  },
  {
    userId: 4,
    nickname: '묵묵부답#2222',
    outfit: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Wait',
    level: 1,
    isOnline: false,
    relation: 'REQUEST_SENT',
  },
  {
    userId: 5,
    nickname: '비매너유저#9999',
    outfit: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Block',
    level: 99,
    isOnline: false,
    relation: 'BLOCKED',
  },
];

export const MOCK_RECOMMENDED: FriendProfile[] = [
  {
    userId: 101,
    nickname: '뉴비환영#0001',
    outfit: 'https://api.dicebear.com/7.x/miniavs/svg?seed=New',
    level: 2,
    isOnline: true,
  },
  {
    userId: 102,
    nickname: '같이놀아요#0002',
    outfit: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Play',
    level: 15,
    isOnline: false,
  },
  {
    userId: 103,
    nickname: '고수등장#7777',
    outfit: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Gosu',
    level: 50,
    isOnline: true,
  },
];

const MOCK_ALL_USERS = [
  { userId: 1001, nickname: '검색테스트1#1111', level: 5, isOnline: true },
  { userId: 1002, nickname: '검색테스트2#2222', level: 10, isOnline: false },
  { userId: 1003, nickname: '숨은고수#9999', level: 99, isOnline: true },
  { userId: 1004, nickname: '폴리카소#7777', level: 1, isOnline: false },
  { userId: 1005, nickname: '아이유#1004', level: 50, isOnline: true },
];

export const handleFriendGetList = (socket: MockSocket) => {
  socket.trigger(SOCKET_EVENTS.FRIEND_GET_ALL_RESPONSE, MOCK_FRIENDS);
};

export const handleFriendGetRecommended = (socket: MockSocket) => {
  socket.trigger(
    SOCKET_EVENTS.FRIEND_GET_RECOMMENDED_RESPONSE,
    MOCK_RECOMMENDED,
  );
};

export const handleFriendRequestSend = (socket: MockSocket, payload: any) => {
  const { targetNickname } = payload;
  console.log(`[Mock] 친구 요청 보냄: ${targetNickname}`);
};

export const handleFriendAccept = (socket: MockSocket, payload: any) => {
  const { requesterId } = payload;

  socket.trigger(SOCKET_EVENTS.FRIEND_STATUS_UPDATE, {
    userId: requesterId,
    relation: 'FRIEND',
  });
};

export const handleFriendBlock = (socket: MockSocket, payload: any) => {
  const { targetId } = payload;

  socket.trigger(SOCKET_EVENTS.FRIEND_STATUS_UPDATE, {
    userId: targetId,
    relation: 'BLOCKED',
  });
};

export const handleFriendDelete = (socket: MockSocket, payload: any) => {
  const { targetId } = payload;

  socket.trigger(SOCKET_EVENTS.FRIEND_STATUS_UPDATE, {
    userId: targetId,
    relation: 'NONE',
  });
};

export const handleFriendSearch = (socket: MockSocket, payload: any) => {
  const { keyword } = payload;

  if (!keyword) {
    socket.trigger(SOCKET_EVENTS.FRIEND_SEARCH_RESPONSE, []);
    return;
  }

  const foundUsers = MOCK_ALL_USERS.filter((user) =>
    user.nickname.includes(keyword),
  );

  const myRelationIds = new Set(MOCK_FRIENDS.map((f) => f.userId));

  const finalResults = foundUsers.filter(
    (user) => !myRelationIds.has(user.userId),
  );

  socket.trigger(SOCKET_EVENTS.FRIEND_SEARCH_RESPONSE, finalResults);
};
