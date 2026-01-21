/**
 * 이미지에 색상(Tint)을 입힌 오프스크린 캔버스를 생성하여 반환합니다.
 */
export const createTintedBrush = (
  image: HTMLImageElement,
  color: string,
): HTMLCanvasElement | null => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // 이미지 그리기
  ctx.drawImage(image, 0, 0);

  // 색상 덮어씌우기 (Source-In: 기존 그림 위에 색만 남김)
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
};

export const getDistance = (
  p1: { x: number; y: number },
  p2: { x: number; y: number },
): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};
