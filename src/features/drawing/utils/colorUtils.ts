import { DRAWING_CONSTANTS } from '../constants/drawingConstants';

export const isWhiteColor = (color: string) =>
  color.toUpperCase() === '#FFFFFF';

export const getSliderPercentage = (value: number) => {
  const min = DRAWING_CONSTANTS.MIN_SIZE;
  const max = DRAWING_CONSTANTS.MAX_SIZE;
  return ((value - min) / (max - min)) * 100;
};
