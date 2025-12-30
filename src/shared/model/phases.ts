import type { DrawData } from './drawing';

export const PHASE_TIME = {
  THEME_SELECT: 22,
  DRAWING: 92,
  EVALUATING: 92,
  ROUND_SUMMARY: 32,
  FINISHED: 32,
} as const;

export interface ThemeSelectingContext {
  selectorId: string;
  nickname: string;
  value: string;
}

export interface DrawingContext {
  currentTheme: string;
}

export interface EvaluatingContext {
  drawings: Record<string, DrawData>;
}

export interface RoundSummaryContext {
  ranking: RoundResult[];
}

export interface RoundResult {
  userId: string;
  drawData: DrawData;
  score: number;
  isMine: boolean;
}

export interface FinishContext {
  results: {
    userId: string;
    rank: number;
    expGained: number;
    coinsGained: number;
    didLevelUp: boolean;
  }[];
}
