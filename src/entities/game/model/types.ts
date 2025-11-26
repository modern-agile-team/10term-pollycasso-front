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
  /** 사용자의 고유 식별자(UUID)입니다. */
  userId: string;

  /** 화면에 표시될 닉네임입니다. */
  nickname: string;

  /** 사용자의 레벨입니다. 레벨에 따라 닉네임 색상이 결정될 수 있습니다. */
  level: number;

  /**
   * 사용자의 착용 아이템 목록입니다. 순서가 중요합니다.
   * [새, 악세사리, 모자, 상의, 하의, 신발, 효과]
   */
  outfit: string[];

  /**
   * 현재 소켓 연결 여부입니다.
   * `false`일 경우 탈주한 사용자로 처리됩니다.
   */
  isConnected: boolean;

  /**
   * 소속된 팀의 ID입니다. (예: 'RED', 'BLUE')
   * 개인전일 경우 `null`입니다.
   */
  teamId: string | null;

  /**
   * 게임 전체 누적 점수입니다.
   * 최종 순위를 결정하는 기준이 됩니다.
   */
  totalScore: number | null;

  /**
   * 현재 페이즈에서의 준비/완료 상태입니다.
   * - `waiting`: 게임 시작 준비 완료 여부
   * - `drawing`: 그림 제출 완료 여부
   * - `evaluating`: 평가 완료 여부
   * - `round_summary`: 다음 라운드 진행 동의 여부
   */
  isReady: boolean | null;

  // === 라운드 및 결과 정산용 ===

  /**
   * 이번 라운드에서 획득한 점수입니다.
   * `round_summary`에서 그림별 순위를 매길 때 사용됩니다.
   */
  score: number | null;

  /**
   * 게임 종료(`finished`) 시 최종 순위입니다.
   * 동점자 처리 로직이 반영된 결과값입니다.
   */
  rank: number | null;

  /** 게임 종료 후 획득한 경험치 양입니다. */
  expGained: number | null;

  /** 게임 종료 후 획득한 코인 양입니다. */
  coinsGained: number | null;

  /** 이번 게임 결과로 레벨업을 했는지 여부입니다. */
  didLevelUp: boolean | null;

  /** 레벨업을 했을 경우, 변경된 새로운 레벨입니다. */
  newLevel: number | null;
}

/**
 * 그리기 단계에서 사용자가 보유한 아이템 및 인벤토리 상태입니다.
 */
export interface MyItems {
  /** 현재 사용 가능한 아이템 ID 목록입니다. */
  usable: string[];

  /**
   * 아이템별 쿨타임 상태입니다.
   * Key: 아이템 ID, Value: 남은 시간(초) 또는 사용 가능 시각
   */
  cooldowns: Record<string, number>;

  /** 현재 보유 코인입니다. */
  coins: number;

  /**
   * 보유 중인 아이템 수량입니다.
   * Key: 아이템 ID, Value: 보유 개수
   */
  inventory: Record<string, number>;
}

/**
 * 방의 기본 설정 정보입니다.
 */
export interface RoomSettings {
  /** 방 제목입니다. */
  roomTitle: string;

  /** 게임 모드 (개인전/팀전) */
  gameMode: 'SOLO' | 'TEAM';

  /** 최대 입장 가능한 인원수입니다. */
  maxPlayers: number;

  /** 비공개 방 여부입니다. true일 경우 password가 필요합니다. */
  isPrivate: boolean;

  /**
   * 비공개 방일 경우 설정된 비밀번호입니다.
   * `isPrivate`가 false일 경우 null입니다.
   */
  password?: string | null;
}

/**
 * 주제 선정(`theme_selecting`) 단계의 상태 정보입니다.
 */
export interface ThemeSelecting {
  /** 현재 주제를 입력 중인 유저의 ID입니다. */
  userId: string;

  /** 주제를 입력 중인 유저의 닉네임입니다. */
  nickname: string;

  /** 실시간으로 입력 중인 주제 문자열입니다. */
  value: string;

  /**
   * 주제 입력이 확정되었는지 여부입니다.
   * true가 되면 해당 주제로 게임이 진행됩니다.
   */
  isFinalized: boolean;
}
