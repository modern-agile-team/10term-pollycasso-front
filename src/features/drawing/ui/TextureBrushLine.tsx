import { useCallback, useMemo } from 'react';
import { Shape } from 'react-konva';
import type { Context } from 'konva/lib/Context';
import type { Shape as KonvaShape } from 'konva/lib/Shape';

import { createTintedBrush, getDistance } from '../utils/brushUtils';

interface TextureBrushLineProps {
  points: number[];
  color: string;
  size: number;
  textureImage: HTMLImageElement;
  spacing?: number;
}

export const TextureBrushLine = ({
  points,
  color,
  size,
  textureImage,
  spacing = 0.2,
}: TextureBrushLineProps) => {
  const tintedBrush = useMemo(() => {
    return createTintedBrush(textureImage, color);
  }, [textureImage, color]);

  const drawTextureStroke = useCallback(
    (context: Context, shape: KonvaShape) => {
      if (!tintedBrush || points.length < 4) return;

      const ctx = context.canvas.getContext(
        '2d',
      ) as unknown as CanvasRenderingContext2D;
      if (!ctx) return;

      const stampSpacing = Math.max(size * spacing, 1);
      let lastDrawnPoint = { x: points[0], y: points[1] };

      ctx.drawImage(
        tintedBrush,
        lastDrawnPoint.x - size / 2,
        lastDrawnPoint.y - size / 2,
        size,
        size,
      );

      /**
       * [데이터 구조 설명]
       * Konva의 points 배열은 [x1, y1, x2, y2, x3, y3...] 처럼
       * x와 y 좌표가 번갈아 나오는 '1차원 배열(Flat Array)' 형태입니다.
       *
       * - 인덱스 0, 1 : 첫 번째 점 (x, y) -> 위에서 이미 처리함(lastDrawnPoint)
       * - 인덱스 2, 3 : 두 번째 점 (x, y) -> 여기서부터 반복 시작
       *
       * 따라서 i는 2부터 시작하며, x와 y 두 개씩 건너뛰어야 하므로 i += 2를 합니다.
       */
      for (let i = 2; i < points.length; i += 2) {
        const currentPoint = { x: points[i], y: points[i + 1] };
        const dist = getDistance(lastDrawnPoint, currentPoint);

        if (dist > stampSpacing) {
          const steps = dist / stampSpacing;

          for (let j = 1; j < steps; j++) {
            const x =
              lastDrawnPoint.x +
              (currentPoint.x - lastDrawnPoint.x) * (j / steps);
            const y =
              lastDrawnPoint.y +
              (currentPoint.y - lastDrawnPoint.y) * (j / steps);

            ctx.drawImage(tintedBrush, x - size / 2, y - size / 2, size, size);
          }
          lastDrawnPoint = currentPoint;
        }
      }
    },
    [points, size, spacing, tintedBrush],
  );

  return <Shape sceneFunc={drawTextureStroke} listening={false} />;
};
