import type { Room } from '@/features/main/model/types';

export const mockRooms: Room[] = [
  {
    id: 2103,
    name: '밥아저씨 컴온!',
    mode: 'SOLO',
    currentPlayers: 1,
    maxPlayers: 4,
    status: 'WAITING',
    isPrivate: false,
  },
  {
    id: 3332,
    name: '하하하하하하하',
    mode: 'SOLO',
    currentPlayers: 4,
    maxPlayers: 4,
    status: 'IN_PROGRESS',
    isPrivate: false,
  },
  {
    id: 7810,
    name: '고수만 와라',
    mode: 'SOLO',
    currentPlayers: 2,
    maxPlayers: 4,
    status: 'WAITING',
    isPrivate: true,
  },
  {
    id: 5521,
    name: '랜덤팀전 ㄱ?',
    mode: 'TEAM',
    currentPlayers: 6,
    maxPlayers: 8,
    status: 'WAITING',
    isPrivate: false,
  },
  {
    id: 9980,
    name: '숨 막히는 전략전',
    mode: 'TEAM',
    currentPlayers: 8,
    maxPlayers: 8,
    status: 'IN_PROGRESS',
    isPrivate: true,
  },
  {
    id: 4411,
    name: '편하게 즐겨요~',
    mode: 'SOLO',
    currentPlayers: 3,
    maxPlayers: 4,
    status: 'WAITING',
    isPrivate: false,
  },
  {
    id: 6666,
    name: '뾰롱',
    mode: 'SOLO',
    currentPlayers: 4,
    maxPlayers: 4,
    status: 'WAITING',
    isPrivate: false,
  },
] as const;

export const mockChannels = [
  { label: '[전체]', value: '전체' },
  { label: '[친구]', value: '친구' },
];

export const mockFriends = [
  { id: 1, name: '레전드프론트엔드' },
  { id: 2, name: '레전드백엔드' },
  { id: 3, name: 'aa1' },
  { id: 4, name: 'a' },
  { id: 5, name: 'asdf11' },
];
