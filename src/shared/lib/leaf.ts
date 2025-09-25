import { LeafGreen, LeafYellow } from '@/assets';

export interface LeafData {
  src: string;
  x: number;
  rotation: number;
  duration: number;
  delay: number;
  size: number;
  screenHeight: number;
  shifts: number[];
}

const getRandomLeaf = (): string =>
  Math.random() < 0.5 ? LeafYellow : LeafGreen;
const getRandomStartX = (max: number): number => Math.random() * max;
const getRandomDuration = (): number => 14 + Math.random() * 12;
const getRandomRotation = (): number => Math.random() * 360;
const getRandomSize = (): number => 50 + Math.random() * 50;
const getRandomXShifts = (baseX: number): number[] => {
  const shifts = Array.from(
    { length: 4 },
    () => baseX + (Math.random() - 0.5) * 80,
  );
  return [baseX, ...shifts, baseX];
};

export const createLeafData = (
  count: number,
  width: number,
  height: number,
): LeafData[] =>
  Array.from({ length: count }, (_, i) => {
    const baseX = getRandomStartX(width);
    return {
      src: getRandomLeaf(),
      x: baseX,
      rotation: getRandomRotation(),
      duration: getRandomDuration(),
      delay: i * 0.5,
      size: getRandomSize(),
      screenHeight: height,
      shifts: getRandomXShifts(baseX),
    };
  });
