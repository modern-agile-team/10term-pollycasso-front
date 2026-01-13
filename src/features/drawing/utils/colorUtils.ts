import { DRAWING_CONSTANTS } from '../constants/drawingConstants';
import type { RGBA } from '../model/types';

export const isWhiteColor = (color: string) =>
  color.toUpperCase() === '#FFFFFF';

export const getSliderPercentage = (value: number) => {
  const min = DRAWING_CONSTANTS.MIN_SIZE;
  const max = DRAWING_CONSTANTS.MAX_SIZE;
  return ((value - min) / (max - min)) * 100;
};

export const hexToRgb = (hex: string): Omit<RGBA, 'a'> | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const isColorMatch = (
  target: RGBA,
  current: RGBA,
  tolerance: number,
): boolean => {
  return (
    Math.abs(target.r - current.r) <= tolerance &&
    Math.abs(target.g - current.g) <= tolerance &&
    Math.abs(target.b - current.b) <= tolerance &&
    Math.abs(target.a - current.a) <= tolerance
  );
};

// 시작 색상과 칠하려는 색상이 완전히 같은지 확인 (조기 종료용)
export const isSameColor = (a: RGBA, b: Omit<RGBA, 'a'>): boolean => {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === 255;
};

export const getPixelColor = (
  data: Uint8ClampedArray,
  index: number,
): RGBA => ({
  r: data[index],
  g: data[index + 1],
  b: data[index + 2],
  a: data[index + 3],
});
