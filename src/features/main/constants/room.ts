export const ROOM_STATUS = {
  WAITING: {
    label: '대기중',
    text: 'text-[#2ADB75]',
    bg: 'bg-[#2ADB75]',
  },
  IN_PROGRESS: {
    label: '게임중',
    text: 'text-[#FE543E]',
    bg: 'bg-[#FE543E]',
  },
} as const;

export const ROOM_MODE = {
  TEAM: {
    label: '팀',
    bg: 'bg-[#73ABFF]',
  },
  SOLO: {
    label: '개인',
    bg: 'bg-[#FFB83E]',
  },
} as const;
