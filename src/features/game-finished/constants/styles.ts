export const RANK_STYLES = {
  1: {
    wrapper:
      'absolute bottom-[90%] left-1/2 -translate-x-1/2 w-80 h-80 bg-transparent',
    bird: 'relative w-full h-full',
    belt: 'absolute top-28 left-[51%] -translate-x-1/2 w-[180px] h-44 object-contain',
    wreath:
      'absolute -top-5 left-[50%] -translate-x-1/2 w-32 h-32 object-contain',

    starWrapper: 'absolute -bottom-9 right-[5%] flex items-center gap-0.5 z-10',
    starIcon: 'w-5 h-5 text-[#525252]',
    scoreText: 'font-ssrm font-bold text-xl pt-0.5 text-[#525252]',
    badge:
      'absolute -bottom-20 left-1/2 -translate-x-1/2 font-ssrm font-bold text-white text-3xl bg-gradient-to-r from-[#D4B162] to-[#EEDFAE] px-4 py-1 rounded-[20px] shadow-inner whitespace-nowrap shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]',
    coinIcon:
      'absolute -bottom-28 left-1/4 -translate-x-1/2 w-6 h-6 object-contain',
    rewardText:
      'absolute -bottom-[116px] left-1/4 translate-x-4 font-ssrm font-bold text-[#525252] text-xl',
    rewardSpan: 'text-lg',
  },
  2: {
    wrapper: 'absolute bottom-[75%] right-[62%] w-72 h-72 bg-transparent',
    bird: 'w-full h-full object-contain',
    belt: 'absolute top-24 left-[51%] -translate-x-1/2 w-[160px] h-44 object-contain',
    wreath: null,
    starWrapper:
      'absolute -bottom-8 right-[25%] flex items-center gap-0.5 z-10',
    starIcon: 'w-4 h-4 text-[#9A9A9A]',
    scoreText: 'font-ssrm font-bold text-sm text-[#9A9A9A]',
    badge:
      'absolute -bottom-12 left-1/3 -translate-x-1/2 font-ssrm font-bold text-white text-xl bg-gradient-to-r from-[#98A0A6] to-[#E6E9EB] px-4 rounded-[20px] shadow-inner whitespace-nowrap shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]',
    coinIcon:
      'absolute -bottom-20 left-1/8 -translate-x-1/2 w-6 h-6 object-contain',
    rewardText:
      'absolute -bottom-[82px] left-1/8 translate-x-4 font-ssrm font-bold text-[#818181] text-lg',
    rewardSpan: '',
  },
  3: {
    wrapper: 'absolute bottom-[65%] right-[12%] w-56 h-56 bg-transparent',
    bird: 'w-full h-full object-contain',
    belt: 'absolute top-14 left-[51%] -translate-x-1/2 w-[130px] h-44 object-contain',
    wreath: null,
    starWrapper:
      'absolute -bottom-8 -right-[18%] flex items-center gap-0.5 z-10',
    starIcon: 'w-4 h-4 text-[#9A9A9A]',
    scoreText: 'font-ssrm font-bold text-sm text-[#9A9A9A]',
    badge:
      'absolute -bottom-12 left-2/3 -translate-x-1/2 font-ssrm font-bold text-white text-xl bg-gradient-to-r from-[#BD8562] to-[#E7D2C5] px-4 rounded-[20px] shadow-inner whitespace-nowrap shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]',
    coinIcon:
      'absolute -bottom-[70px] left-1/2 -translate-x-1/2 w-4 h-4 object-contain',
    rewardText:
      'absolute -bottom-[73px] left-1/2 w-[130px] translate-x-4 font-ssrm font-bold text-sm text-[#818181]',
    rewardSpan: 'text-sm',
  },
} as const;

export const SPOTLIGHT_STYLES = {
  1: {
    style:
      'w-[300px] h-[660px] -top-[350px] bg-gradient-to-b from-white/80 via-white/50 to-transparent',
    clipPath: 'polygon(50% 0%, 50% 0%, 100% 100%, 0% 100%)',
  },
  2: {
    style:
      'w-[300px] h-[700px] -top-[350px] bg-gradient-to-b from-white/50 via-white/5 to-transparent',
    clipPath: 'polygon(50% 0%, 50% 0%, 100% 100%, 0% 100%)',
  },
  3: {
    style:
      'w-[300px] h-[700px] -top-[350px] bg-gradient-to-b from-white/30 via-white/5 to-transparent',
    clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
  },
} as const;

export const TEAM_RANK_STYLES = {
  1: {
    wrapper:
      'absolute bottom-[80%] left-1/2 -translate-x-1/2 w-[275px] h-[275px] bg-transparent',
    badge:
      'absolute top-12 left-[510px] font-ssrm font-bold text-white text-2xl px-4 py-1 rounded-[20px] whitespace-nowrap shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]',
    rewardWrapper:
      'absolute top-[94px] left-[530px] flex items-center justify-end gap-2',
  },
  2: {
    wrapper:
      'absolute bottom-[80%] left-[30%] -translate-x-1/2 w-[275px] h-[275px] bg-transparent',
    badge:
      'absolute top-32 left-[710px] font-ssrm font-bold text-white text-2xl px-4 py-1 rounded-[20px] whitespace-nowrap shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]',
    rewardWrapper:
      'absolute top-[174px] left-[730px] flex items-center justify-end gap-2',
  },
  3: {
    wrapper:
      'absolute bottom-[80%] right-[30%] translate-x-1/2 w-[275px] h-[275px] bg-transparent',
    badge:
      'absolute top-52 left-[310px] font-ssrm font-bold text-white text-2xl px-4 py-1 rounded-[20px] whitespace-nowrap shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]',
    rewardWrapper:
      'absolute top-[252px] left-[330px] flex items-center justify-end gap-2',
  },
};

export const TEAM_SPOTLIGHT_STYLES = {
  1: {
    style: 'w-[300px] h-[660px] -top-[350px] from-white/80 via-white/50 block',
    clipPath: 'polygon(50% 0%, 50% 0%, 100% 100%, 0% 100%)',
  },
  2: { style: 'hidden', clipPath: '' },
  3: { style: 'hidden', clipPath: '' },
};
