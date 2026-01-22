export const RANK_STYLES = {
  1: {
    wrapper:
      'absolute bottom-[90%] left-1/2 -translate-x-1/2 w-80 h-80 bg-transparent',
    bird: 'relative w-full h-full',
    belt: 'absolute top-28 left-[51%] -translate-x-1/2 w-[180px] h-44 object-contain',
    wreath:
      'absolute -top-5 left-[50%] -translate-x-1/2 w-32 h-32 object-contain',

    starWrapper: 'absolute -bottom-8 right-[5%] flex items-center gap-0.5 z-10',
    starIcon: 'w-5 h-5 text-[#8C1000]',
    scoreText: 'font-ssrm font-bold text-[#8C1000] text-xl pt-0.5',
    badge:
      'absolute -bottom-20 left-1/2 -translate-x-1/2 font-ssrm font-bold text-white text-3xl bg-gradient-to-r from-[#8C1000] to-[#FF5555] px-4 py-1 rounded-[20px] shadow-inner whitespace-nowrap',
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
    scoreText: 'font-ssrm font-bold text-[#9A9A9A] text-sm',
    badge:
      'absolute -bottom-12 left-1/3 -translate-x-1/2 font-ssrm font-bold text-white text-xl bg-gradient-to-r from-[#5BDEEC] to-[#005B53] px-4 rounded-[20px] shadow-inner whitespace-nowrap',
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
    scoreText: 'font-ssrm font-bold text-[#9A9A9A] text-sm',
    badge:
      'absolute -bottom-12 left-2/3 -translate-x-1/2 font-ssrm font-bold text-white text-xl bg-gradient-to-r from-[#9EC2C7] to-[#3E938C] px-4 rounded-[20px] shadow-inner whitespace-nowrap',
    coinIcon:
      'absolute -bottom-[70px] left-1/2 -translate-x-1/2 w-4 h-4 object-contain',
    rewardText:
      'absolute -bottom-[73px] left-1/2 w-[130px] translate-x-4 font-ssrm font-bold text-sm text-[#818181]',
    rewardSpan: 'text-sm',
  },
} as const;
