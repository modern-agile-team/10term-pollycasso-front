import type {
  DrawingContext,
  EvaluatingContext,
  FinishContext,
  RoundSummaryContext,
  ThemeSelectingContext,
} from './phases';
import type { Player } from './player';

export interface RoomState {
  status: RoomStatus;
  hostId: string;
  endsAt: number | null;

  settings: RoomSettings;
  players: Player[];
  currentRound: number | null;
  totalRounds: number | null;

  phaseContext: PhaseContext;

  teamScore: TeamScore | null;
}

export type PhaseContext =
  | ThemeSelectingContext
  | DrawingContext
  | EvaluatingContext
  | RoundSummaryContext
  | FinishContext
  | null;

export type RoomStatus =
  | 'WAITING'
  | 'LOADING'
  | 'THEME_SELECTING'
  | 'DRAWING'
  | 'EVALUATING'
  | 'ROUND_SUMMARY'
  | 'FINISHED';

export interface RoomSettings {
  roomTitle: string;
  gameMode: GameMode;
  maxPlayers: number;
  isPrivate: boolean;
}

export type GameMode = 'SOLO' | 'TEAM';

export interface TeamScore {
  red: number;
  blue: number;
}
