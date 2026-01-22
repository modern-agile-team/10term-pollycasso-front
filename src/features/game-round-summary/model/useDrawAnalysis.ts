import { useMemo } from 'react';
import type { DrawData } from '@/entities/drawing';
import {
  extractTopColors,
  calculateTotalDistance,
} from '../utils/drawingAchievements';
import {
  STATS_CONSTANTS,
  ACHIEVEMENT_THRESHOLDS,
} from '../constants/statsConstants';
import { ACHIEVEMENT_CONFIG } from '../utils/achievementConfig';
import type { AchievementID } from '../utils/achievementConfig';

export const useDrawAnalysis = (drawData: DrawData, score: number) => {
  // 가장 많이 사용한 3가지 색상
  const topColors = useMemo(() => extractTopColors(drawData.lines), [drawData]);

  // 유저가 받은 점수와 별점 표시 로직
  const starDisplay = useMemo(
    () => ({
      displayScore: score,
      stars: Array.from({ length: STATS_CONSTANTS.STAR_COUNT }, (_, i) => {
        const scoreForFull = (i + 1) * 2;
        const scoreForHalf = i * 2 + 1;
        if (score >= scoreForFull) return 'full';
        if (score >= scoreForHalf) return 'half';
        return 'empty';
      }),
    }),
    [score],
  );

  // 그린 픽셀의 길이와 획 수
  const stats = useMemo(() => {
    const totalDistance = calculateTotalDistance(drawData.lines);

    return {
      strokeCount: drawData.lines.length,
      distanceMeter: (
        totalDistance * STATS_CONSTANTS.PIXEL_TO_METER_RATIO
      ).toFixed(2),
      colorCount: new Set(drawData.lines.map((l) => l.color)).size,
    };
  }, [drawData]);

  // 업적
  const achievement = useMemo(() => {
    let selectedId: AchievementID = 'DEFAULT';

    if (stats.colorCount >= ACHIEVEMENT_THRESHOLDS.MIN_COLORS_FOR_MASTER) {
      selectedId = 'COLOR_MASTER';
    } else if (
      stats.strokeCount > ACHIEVEMENT_THRESHOLDS.STROKE_COUNT_FOR_EFFORT
    ) {
      selectedId = 'EFFORT_KING';
    } else if (
      stats.strokeCount > 0 &&
      stats.strokeCount < ACHIEVEMENT_THRESHOLDS.MAX_STROKE_FOR_MINIMALIST
    ) {
      selectedId = 'MINIMALIST';
    }

    return ACHIEVEMENT_CONFIG[selectedId];
  }, [stats]);

  return { topColors, starDisplay, stats, achievement };
};
