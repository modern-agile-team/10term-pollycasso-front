/**
 * 게임의 전체 상태를 관리하는 메인 인터페이스입니다.
 * 대기실(`waiting`)부터 게임 종료(`finished`)까지 모든 페이즈의 데이터를 포함합니다.
 */
export interface RoomState {
  /**
   * 현재 게임 방의 진행 상태(Phase)입니다.
   * - `waiting`: 대기실
   * - `theme_selecting`: 주제 선정 (20초)
   * - `drawing`: 그림 그리기 (90초)
   * - `evaluating`: 그림 평가 (90초)
   * - `round_summary`: 라운드 결과 (30초)
   */
  roomStatus:
    | 'waiting'
    | 'loading'
    | 'theme_selecting'
    | 'drawing'
    | 'evaluating'
    | 'round_summary'
    | 'finished';

  /**
   * 방장의 사용자 ID
   * 게임 시작 권한 및 강퇴 권한 가짐
   */
  hostId: string | null;

  /**
   * 현재 페이즈의 남은 시간(초)입니다.
   * `waiting` 상태를 제외한 모든 페이즈에서 사용됩니다.
   */
  timer: number | null;

  /**
   * 방에 참여 중인 모든 플레이어의 목록입니다.
   * @see {@link Player}
   */
  players: Player[];

  // === 페이즈별 전용 데이터 ===

  /**
   * 방 설정 정보입니다.
   * `roomStatus`가 `waiting`일 때 주로 참조됩니다.
   * @see {@link RoomSettings}
   */
  settings: RoomSettings | null;

  /**
   * 주제 선정 페이즈의 실시간 데이터입니다.
   * `roomStatus`가 `theme_selecting`일 때 활성화됩니다.
   * @see {@link ThemeSelecting}
   */
  themeSelecting: ThemeSelecting | null;

  /**
   * 현재 진행 중인 라운드 번호입니다.
   * (drawing, evaluating, round_summary 페이즈 공통)
   */
  currentRound: number | null;

  /**
   * 전체 진행할 총 라운드 수입니다. (기본 3라운드)
   */
  totalRounds: number | null;

  /**
   * 현재 페이즈에서 '완료' 또는 '준비'를 누른 플레이어의 수입니다.
   * drawing, evaluating 페이즈에서 전원 완료 시 조기 종료를 위해 사용됩니다.
   */
  completedCount: number | null;

  /**
   * 현재 라운드의 그림 주제입니다.
   * 랜덤 혹은 이전 선정자를 제외한 특정 플레이어에 의해 지정됩니다.
   */
  currentTheme: string | null;

  /**
   * (Drawing 전용) 현재 그리기 도구 및 아이템 상태입니다.
   * @see {@link MyItems}
   */
  myItems: MyItems | null;

  // === 모드별 전용 데이터 ===

  /**
   * 팀전 모드일 때 각 팀의 누적 점수 현황입니다.
   * @example { "RED": 120, "BLUE": 100 }
   */
  teamScores: Record<string, number> | null;
}

/**
 * 게임에 참여하는 개별 사용자의 정보 및 상태입니다.
 */
export interface Player {
  userId: string;
  nickname: string;
  level: number;

  /**
   * 사용자의 착용 아이템 목록입니다.
   */
  outfit: Outfit;

  /**
   * 현재 보유 코인입니다.
   */
  coins: number;

  isConnected: boolean;
  teamId: string | null;
  totalScore: number | null;

  isReady: boolean | null;
  score: number | null;
  rank: number | null;
  expGained: number | null;
  coinsGained: number | null;
  didLevelUp: boolean | null;
  newLevel: number | null;
}

/**
 * 착용 아이템 상세 정보입니다.
 * bird는 필수이며, 나머지는 착용하지 않을 수(null) 있습니다.
 */
export interface Outfit {
  /** 기본 캐릭터 (새). 탈착 불가하므로 필수값. */
  bird: string;

  /** 이하 옵션 아이템 (미착용 시 null) */
  accessory: string | null;
  hat: string | null;
  top: string | null;
  bottom: string | null;
  shoes: string | null;
  effect: string | null;
}

/**
 * 그리기 단계에서 사용 가능한, 사용자가 보유한 아이템 및 인벤토리 상태입니다.
 * 분산되어 있던 데이터(usable, cooldowns, inventory)를 하나로 통합했습니다.
 */
export interface MyItems {
  items: ItemState[];
}

/**
 * 개별 아이템의 상태 데이터
 */
export interface ItemState {
  itemId: string; // 예: "ink_splash"
  count: number; // 보유 개수

  /**
   * 쿨타임 종료 시각 (Timestamp)
   * 남은 시간(초) 대신 절대 시간을 사용하여 네트워크 딜레이로 인한 오차 제거
   * 쿨타임이 없거나 끝났으면 null
   */
  cooldownEndsAt: number | null;

  isUsable: boolean; // 사용 가능 여부 (서버 판정)
}

/**
 * 방의 기본 설정 정보입니다.
 */
export interface RoomSettings {
  roomTitle: string;
  gameMode: 'SOLO' | 'TEAM';
  maxPlayers: number;
  isPrivate: boolean;
  password?: string | null;
}

/**
 * 주제 선정(`theme_selecting`) 단계의 상태 정보입니다.
 */
export interface ThemeSelecting {
  userId: string;
  nickname: string;
  value: string;
  isFinalized: boolean;
}
