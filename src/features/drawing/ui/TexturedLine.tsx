import { Shape } from 'react-konva';
import type { Context } from 'konva/lib/Context';
import type { Shape as KonvaShape } from 'konva/lib/Shape';

interface TexturedLineProps {
  points: number[];
  color: string;
  size: number;
  textureImage: HTMLImageElement;
  spacing?: number;
}

export const TexturedLine = ({
  points,
  color,
  size,
  textureImage,
  spacing = 0.2,
}: TexturedLineProps) => {
  const getDistance = (
    p1: { x: number; y: number },
    p2: { x: number; y: number },
  ) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  const sceneFunc = (context: Context, shape: KonvaShape) => {
    if (!textureImage || points.length < 4) return;
    const ctx = context.canvas.getContext(
      '2d',
    ) as unknown as CanvasRenderingContext2D;
    if (!ctx) return;

    const tintCanvas = document.createElement('canvas');
    tintCanvas.width = textureImage.width;
    tintCanvas.height = textureImage.height;
    const tintCtx = tintCanvas.getContext('2d');
    if (!tintCtx) return;

    tintCtx.drawImage(textureImage, 0, 0);
    tintCtx.globalCompositeOperation = 'source-in';
    tintCtx.fillStyle = color;
    tintCtx.fillRect(0, 0, tintCanvas.width, tintCanvas.height);

    const stampSpacing = Math.max(size * spacing, 1);

    let lastDrawnPoint = { x: points[0], y: points[1] };

    ctx.drawImage(
      tintCanvas,
      lastDrawnPoint.x - size / 2,
      lastDrawnPoint.y - size / 2,
      size,
      size,
    );

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

          ctx.drawImage(tintCanvas, x - size / 2, y - size / 2, size, size);
        }
        lastDrawnPoint = currentPoint;
      }
    }
  };

  return <Shape sceneFunc={sceneFunc} listening={false} />;
};
