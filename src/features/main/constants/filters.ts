export const ROOM_FILTERS = ['전체', '대기', '개인', '팀'] as const;

export type RoomFilter = (typeof ROOM_FILTERS)[number];

export const ROOM_FILTER_COLORS: Record<RoomFilter, string> = {
  전체: 'bg-[#464646]',
  대기: 'bg-[#2ADB75]',
  개인: 'bg-[#FFB83E]',
  팀: 'bg-[#73ABFF]',
} as const;
