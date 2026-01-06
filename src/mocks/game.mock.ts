import type { GameItem, Outfit, Player, RoomState } from '@/shared/model';

const MOCK_OUTFIT_ME: Outfit = {
  bird: 'bird_blue',
  hat: 'hat_chef',
  accessory: 'glasses_1',
  top: 'shirt_check',
  bottom: 'pants_jean',
  shoes: 'shoes_sneakers',
  effect: 'effect_sparkle',
};

const MOCK_OUTFIT_OPPONENT: Outfit = {
  bird: 'bird_pink',
  hat: 'hat_beret',
  accessory: null,
  top: 'shirt_stripe',
  bottom: 'pants_black',
  shoes: 'shoes_boots',
  effect: null,
};

const MOCK_OUTFIT_DEFAULT: Outfit = {
  bird: 'bird_green',
  hat: null,
  accessory: null,
  top: null,
  bottom: null,
  shoes: null,
  effect: null,
};

const MOCK_INVENTORY_ME: GameItem[] = [
  { itemId: 'blur', count: 1, cooldownEndsAt: 0 },
  { itemId: 'ink_splash', count: 2, cooldownEndsAt: Date.now() + 1000 * 30 },
  { itemId: 'bomb', count: 5, cooldownEndsAt: 0 },
];

const MOCK_ME: Player = {
  userId: 'id-2',
  nickname: '밥아저씨',
  level: 30,
  exp: 1500,
  coins: 500,
  outfit: MOCK_OUTFIT_ME,
  inventory: MOCK_INVENTORY_ME,

  status: 'IDLE',
  isConnected: true,
  isReady: false,
  teamId: 'BLUE',
  totalScore: 1200,
};

const MOCK_OPPONENT: Player = {
  userId: 'user-guest-456',
  nickname: '그림고수',
  level: 12,
  exp: 400,
  coins: 100,
  outfit: MOCK_OUTFIT_OPPONENT,
  inventory: [],

  status: 'IDLE',
  isConnected: true,
  isReady: true,
  teamId: 'RED',
  totalScore: 850,
};

const MOCK_DISCONNECTED: Player = {
  userId: 'user-leaver-789',
  nickname: '탈주닌자',
  level: 5,
  exp: 100,
  coins: 0,
  outfit: MOCK_OUTFIT_DEFAULT,
  inventory: [],

  status: 'IDLE',
  isConnected: false,
  isReady: false,
  teamId: 'BLUE',
  totalScore: 100,
};

const MOCK_BONUS: Player = {
  userId: 'user-leaver-111',
  nickname: '보너스',
  level: 5,
  exp: 50,
  coins: 0,
  outfit: MOCK_OUTFIT_DEFAULT,
  inventory: [],

  status: 'IDLE',
  isConnected: false,
  isReady: false,
  teamId: 'BLUE',
  totalScore: 100,
};

export const MOCK_ROOM_WAITING: RoomState = {
  status: 'WAITING',
  hostId: 'id-2',
  endsAt: null,

  currentRound: 0,
  totalRounds: 3,

  settings: {
    roomTitle: '고수만 (팀전)',
    gameMode: 'TEAM',
    maxPlayers: 8,
    isPrivate: false,
  },

  players: [MOCK_ME, MOCK_OPPONENT, MOCK_DISCONNECTED, MOCK_BONUS],

  phaseContext: null,

  teamScore: {
    blue: 0,
    red: 0,
  },
};

export const MOCK_GAME_SELECTING: RoomState = {
  status: 'THEME_SELECTING',
  hostId: 'id-2',
  endsAt: Date.now() + 1000 * 22,

  currentRound: 1,
  totalRounds: 3,

  settings: {
    roomTitle: '즐거운 게임방',
    gameMode: 'SOLO',
    maxPlayers: 8,
    isPrivate: false,
  },

  players: [MOCK_ME, MOCK_OPPONENT, MOCK_DISCONNECTED, MOCK_BONUS],

  phaseContext: {
    selectorId: 'id-2',
    nickname: '폴리',
    value: '',
  },

  teamScore: null,
};

export const MOCK_GAME_DRAWING: RoomState = {
  status: 'DRAWING',
  hostId: 'id-2',
  endsAt: Date.now() + 1000 * 92,

  currentRound: 1,
  totalRounds: 3,

  settings: {
    roomTitle: '즐거운 게임방',
    gameMode: 'SOLO',
    maxPlayers: 8,
    isPrivate: false,
  },

  players: [MOCK_ME, MOCK_OPPONENT, MOCK_DISCONNECTED, MOCK_BONUS],

  phaseContext: {
    currentTheme: '',
  },

  teamScore: null,
};

export const chatHandlers = [];
