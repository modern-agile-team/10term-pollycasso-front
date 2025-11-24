export const ROOM_TITLE = {
  MIN: 1,
  MAX: 15,
} as const;

export const ROOM_TITLE_MESSAGE = {
  REQUIRED: '방 제목을 입력해주세요.',
  TOO_LONG: `최대 ${ROOM_TITLE.MAX}자까지 입력 가능합니다.`,
} as const;

export const ROOM_MODE = {
  SOLO: 'SOLO',
  TEAM: 'TEAM',
} as const;

export const SOLO_PLAYER_RANGE = {
  MIN: 3,
  MAX: 6,
} as const;

export const TEAM_PLAYER_OPTIONS = [4, 6] as const;

export const PRIVATE_ROOM = {
  PASSWORD_REGEX: /^\d{4}$/,
  ERROR_MESSAGE: '비공개 방은 4자리 숫자 비밀번호가 필요합니다.',
} as const;
