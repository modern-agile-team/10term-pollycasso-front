import type { DrawData } from '@/entities/drawing';

export interface RoundResult {
  userId: string; // 해당 그림을 그린 사람
  drawData: DrawData; // 해당 그림 데이터
  score: number; // 해당 그림 점수 (예: 4.25)
  isMine: boolean; // 해당 그림이 내 그림인가?
}

export interface RoundSummaryContext {
  ranking: RoundResult[];
}
