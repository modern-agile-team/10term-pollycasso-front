export const getLevelColor = (level: number) => {
  if (level >= 20) return 'bg-[#FF3434]';
  if (level >= 10) return 'bg-[#82DC99]';
  return 'bg-[#FFD966]';
};
