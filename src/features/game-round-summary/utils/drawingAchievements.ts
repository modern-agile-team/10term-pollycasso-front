import type { DrawData } from '@/entities/drawing';

/**
 * 획 데이터에서 상위 3가지 색상을 추출합니다.
 */
export const extractTopColors = (lines: DrawData['lines']): string[] => {
  const colorMap: Record<string, number> = {};

  lines.forEach((line) => {
    if (line.tool === 'eraser') return;
    // 점의 개수를 가중치로 사용
    colorMap[line.color] = (colorMap[line.color] || 0) + line.points.length;
  });

  return Object.entries(colorMap)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 3)
    .map(([color]) => color);
};

/**
 * 총 이동 거리(픽셀 단위)를 계산합니다.
 */
export const calculateTotalDistance = (lines: DrawData['lines']): number => {
  let totalDistance = 0;

  lines.forEach((line) => {
    for (let i = 2; i < line.points.length; i += 2) {
      const x = line.points[i];
      const y = line.points[i + 1];
      const prevX = line.points[i - 2];
      const prevY = line.points[i - 1];

      // 유클리드 거리 (피타고라스 정리)
      totalDistance += Math.sqrt(
        Math.pow(x - prevX, 2) + Math.pow(y - prevY, 2),
      );
    }
  });

  return totalDistance;
};
