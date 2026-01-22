// 매직 넘버들을 상수로 관리하여 의미를 명확히 합니다.
export const STATS_CONSTANTS = {
  PIXEL_TO_METER_RATIO: 0.000264, // 픽셀 -> 미터 환산 비율
  MAX_SCORE: 10, // 만점 기준
  STAR_COUNT: 5, // 별 개수
} as const;

// 도전과제를 위한 매직넘버 상수
export const ACHIEVEMENT_THRESHOLDS = {
  MIN_COLORS_FOR_MASTER: 5,
  STROKE_COUNT_FOR_EFFORT: 100,
  MAX_STROKE_FOR_MINIMALIST: 10,
} as const;
