import type { DrawData } from './drawing';

export const PHASE_TIME = {
  THEME_SELECT: 22,
  DRAWING: 92,
  EVALUATING: 92,
  ROUND_SUMMARY: 32,
  FINISHED: 32,
  DEFAULT: 30,
} as const;

export interface ThemeSelectingContext {
  kind: 'THEME_SELECTING';
  selectorId: number;
  nickname: string;
}

export interface DrawingContext {
  kind: 'DRAWING';
  currentTheme: string;
}

export interface EvaluatingContext {
  kind: 'EVALUATING';
  drawings: Record<string, DrawData>;
}

export interface RoundSummaryContext {
  kind: 'ROUND_SUMMARY';
  ranking: RoundResult[];
}

export interface RoundResult {
  kind: 'ROUND_RESULT';
  userId: string;
  drawData: DrawData;
  score: number;
  isMine: boolean;
}

export interface FinishContext {
  kind: 'FINISHED';
  results: {
    userId: string;
    rank: number;
    expGained: number;
    coinsGained: number;
    didLevelUp: boolean;
  }[];
}
