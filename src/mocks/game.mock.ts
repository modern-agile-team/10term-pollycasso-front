import type { RoomState, Player } from '@/entities/game/model/types';

const MOCK_ME: Player = {
  userId: 'id-2',
  nickname: '밥아저씨',
  level: 30,
  outfit: [
    'bird_blue',
    'glasses_1',
    'hat_chef',
    'shirt_check',
    'pants_jean',
    'shoes_sneakers',
    'effect_sparkle',
  ],
  isConnected: true,
  teamId: 'BLUE',
  totalScore: 1200,
  isReady: false,
  score: 0,
  rank: null,
  expGained: null,
  coinsGained: null,
  didLevelUp: false,
  newLevel: null,
};

const MOCK_OPPONENT: Player = {
  userId: 'user-guest-456',
  nickname: '그림고수',
  level: 12,
  outfit: [
    'bird_pink',
    'none',
    'hat_beret',
    'shirt_stripe',
    'pants_black',
    'shoes_boots',
    'none',
  ],
  isConnected: true,
  teamId: 'RED',
  totalScore: 850,
  isReady: false,
  score: 0,
  rank: null,
  expGained: null,
  coinsGained: null,
  didLevelUp: null,
  newLevel: null,
};

const MOCK_DISCONNECTED: Player = {
  userId: 'user-leaver-789',
  nickname: '탈주닌자',
  level: 5,
  outfit: [
    'bird_green',
    'none',
    'none',
    'shirt_basic',
    'pants_short',
    'shoes_slipper',
    'none',
  ],
  isConnected: false,
  teamId: 'BLUE',
  totalScore: 100,
  isReady: false,
  score: null,
  rank: null,
  expGained: null,
  coinsGained: null,
  didLevelUp: null,
  newLevel: null,
};

const MOCK_BONUS: Player = {
  userId: 'user-leaver-111',
  nickname: '보너스',
  level: 5,
  outfit: [
    'bird_green',
    'none',
    'none',
    'shirt_basic',
    'pants_short',
    'shoes_slipper',
    'none',
  ],
  isConnected: false,
  teamId: 'BLUE',
  totalScore: 100,
  isReady: false,
  score: null,
  rank: null,
  expGained: null,
  coinsGained: null,
  didLevelUp: null,
  newLevel: null,
};

export const MOCK_ROOM_STATE: RoomState = {
  roomStatus: 'waiting',
  hostId: 'user-leaver-111',
  timer: null,
  players: [MOCK_ME, MOCK_OPPONENT, MOCK_DISCONNECTED, MOCK_BONUS],
  settings: {
    roomTitle: '고수만 (팀전)',
    gameMode: 'TEAM',
    maxPlayers: 8,
    isPrivate: false,
    password: null,
  },
  themeSelecting: null,
  currentRound: 0,
  totalRounds: 0,
  completedCount: 0,
  currentTheme: null,

  myItems: null,

  teamScores: {
    BLUE: 0,
    RED: 0,
  },
};

export const chatHandlers = [];
