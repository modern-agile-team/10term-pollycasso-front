import type { ItemMeta } from '@/entities/game';

export const COLORS = {
  PRIMARY_DARK: '#003D00',
  TIMER_GREEN: '#0ABC22',
  TIMER_YELLOW: '#FFE100',
  TIMER_RED: '#F20000',
  NOTICE_BG: '#D9D9D9',
  NOTICE_TEXT: '#000000',
  BADGE_PINK: '#E597FF',
};

export const GAME_CONFIG = { MAX_TIME: 90, ITEMS_PER_PAGE: 5 };

export const UI_TEXT = {
  NOTICE: '📢 [공지] 서버 안정화 작업이 예정되어 있습니다.',
  THEME_PREFIX: '주제: ',
  BTN_COMPLETE: '완료',
};

export const ALL_ITEMS_META: ItemMeta[] = [
  {
    id: 'ink_splash',
    name: '먹물 폭탄',
    description: '어이쿠, 손이 미끄러졌네?',
    category: 'attack',
    imagePath: 'items/consumables/ink_splash.png',
    price: 150,
    effect: '상대방 화면 중앙에 거대한 먹물을 뿌려 5초간 시야를 차단합니다.',
  },
  {
    id: 'blur_vision',
    name: '침침한 안경',
    description: '갑자기 세상이 몽환적으로 보이기 시작합니다.',
    category: 'attack',
    imagePath: 'items/consumables/glasses_blur.png',
    price: 200,
    effect: '10초 동안 상대방의 캔버스를 흐릿하게(Blur) 만듭니다.',
  },
  {
    id: 'mirror_control',
    name: '거울 모드',
    description: '왼쪽으로 갈까? 오른쪽으로 갈까? 뇌정지가 올 시간입니다.',
    category: 'attack',
    imagePath: 'items/consumables/mirror.png',
    price: 300,
    effect: '7초 동안 상대방 마우스의 좌우 이동 방향을 반대로 바꿉니다.',
  },
  {
    id: 'earthquake',
    name: '수전증 유발',
    description: '커피를 너무 많이 마셨나 봐요. 손이 떨리네요.',
    category: 'attack',
    imagePath: 'items/consumables/shake.png',
    price: 250,
    effect: '5초 동안 상대방의 캔버스와 커서가 무작위로 흔들립니다.',
  },
  {
    id: 'color_steal',
    name: '흑백 필름',
    description: '너의 그림에서 "색채"라는 사치를 압수하겠다.',
    category: 'attack',
    imagePath: 'items/consumables/grayscale.png',
    price: 400,
    effect: '10초 동안 상대방이 검은색(Black)만 사용할 수 있게 만듭니다.',
  },
  {
    id: 'shield_glass',
    name: '투명 우산',
    description: '내 소중한 캔버스에 흠집 하나 낼 수 없지.',
    category: 'defense',
    imagePath: 'items/consumables/shield.png',
    price: 300,
    effect: '1회에 한해 상대방의 공격 아이템 효과를 완벽하게 막아냅니다.',
  },
  {
    id: 'cleaner_sponge',
    name: '매직 스펀지',
    description: '망친 그림도 새것처럼! (마음은 복구 안 됨)',
    category: 'defense',
    imagePath: 'items/consumables/sponge.png',
    price: 150,
    effect: '현재 적용 중인 시야 차단(먹물, 블러) 효과를 즉시 제거합니다.',
  },
  {
    id: 'stabilizer',
    name: '손떨림 방지',
    description: '장인의 정신을 집중하여 평정심을 되찾습니다.',
    category: 'defense',
    imagePath: 'items/consumables/meditation.png',
    price: 200,
    effect: '현재 적용 중인 조작 방해(거울, 흔들림) 효과를 즉시 해제합니다.',
  },
];
