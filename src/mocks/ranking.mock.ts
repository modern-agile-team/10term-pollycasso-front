export const RANKING_MOCK_DATA: Record<string, Record<string, any[]>> = {
  score: {
    daily: [
      {
        rank: 1,
        username: 'asdf1234',
        nickname: '폴리카소',
        level: 3,
        value: 13999,
        outfit: { bird: 'bird_01', top: 'top_01', bottom: 'bottom_01' },
      },
      {
        rank: 2,
        username: 'modernagile',
        nickname: '모던애자일',
        level: 5,
        value: 12500,
        outfit: { bird: 'bird_01', accessory: 'acc_01', top: 'top_02' },
      },
      {
        rank: 3,
        username: 'indukgreatking',
        nickname: '인덕대왕',
        level: 2,
        value: 10200,
        outfit: { bird: 'bird_01', hat: 'hat_01', bottom: 'bottom_02' },
      },
      {
        rank: 4,
        username: 'demonking',
        nickname: '대마왕',
        level: 1,
        value: 8900,
        outfit: { bird: 'bird_01', top: 'top_03' },
      },
    ],
    weekly: [],
    monthly: [],
  },
  coins: {
    daily: [
      {
        rank: 1,
        username: 'coin1234',
        nickname: '코인왕',
        level: 10,
        value: 55000,
        outfit: { bird: 'bird_01', accessory: 'acc_02' },
      },
      {
        rank: 2,
        username: '4321nioc',
        nickname: '왕인코',
        level: 10,
        value: 55000,
        outfit: { bird: 'bird_03', accessory: 'acc_05' },
      },
    ],
    weekly: [],
    monthly: [],
  },
};
