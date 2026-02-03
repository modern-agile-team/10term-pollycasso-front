export const ENTRY_ERROR_MESSAGES: Record<string, string> = {
  ROOM_PASSWORD_REQUIRED: '비공개 방이에요! 비밀번호를 입력해주세요.',
  ROOM_INVALID_PASSWORD: '비밀번호가 일치하지 않아요! 다시 확인해주세요.',
  INVALID_INPUT: '비밀번호는 4글자에요!',

  ROOM_NOT_FOUND: '존재하지 않거나 삭제된 방이에요.',
  ROOM_FULL: '방이 꽉 찼습니다. 빈 자리가 날 때까지 기다려주세요!',
  GAME_ALREADY_STARTED: '이미 게임이 진행 중이에요!',
  ROOM_KICKED: '강퇴당했습니다!',

  ACCESS_TOKEN_MISSING: '로그인 정보가 없습니다. 다시 로그인해주세요!',
  EXPIRED_ACCESS_TOKEN: '로그인 세션이 만료되었습니다.',
  INVALID_ACCESS_TOKEN: '잘못된 접근입니다.',
  PERMISSION_DENIED: '권한이 없습니다.',

  DEFAULT: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

export const ROOM_ERROR_MESSAGES: Record<string, string> = {
  GAME_START_NOT_HOST: '방장만 게임을 시작할 수 있어요.',
  GAME_START_NOT_ENOUGH_PLAYERS: '게임 시작에 필요한 인원이 부족해요.',
  NOT_ALL_PLAYERS_READY: '모든 플레이어가 준비 완료 상태여야 해요.',
  HOST_CANNOT_TOGGLE_READY: '방장은 준비 버튼을 누를 수 없어요.',

  TEAM_FULL: '해당 팀은 인원이 꽉 찼어요...',
  SOLO_MODE_NO_TEAMS: '개인전 모드에서는 팀을 선택할 수 없어요!',
  TEAM_IMBALANCE: '팀 인원 균형이 맞지 않아요.',

  CANNOT_KICK_SELF: '자기 자신을 강퇴할 수는 없어요!!',
  PLAYER_NOT_FOUND: '해당 플레이어를 찾을 수 없어요.',
};
