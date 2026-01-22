import type { RoundSummaryContext } from '@/features/game-round-summary';

export const MOCK_ROUND_SUMMARY: RoundSummaryContext = {
  ranking: [
    {
      userId: '캡틴아메리카',
      score: 9.2,
      isMine: false,
      drawData: {
        lines: [
          {
            tool: 'brush',
            color: '#FF0000',
            size: 5,
            points: [10, 10, 20, 20, 30, 30],
          },
          {
            tool: 'pencil',
            color: '#FF0000',
            size: 2,
            points: [50, 50, 60, 60],
          },
          {
            tool: 'brush',
            color: '#FFFFFF',
            size: 8,
            points: [100, 100, 110, 110],
          },
          {
            tool: 'neon',
            color: '#0000FF',
            size: 10,
            points: [200, 200, 210, 210],
          },
          { tool: 'brush', color: '#FF0000', size: 5, points: [5, 5, 15, 15] },
          {
            tool: 'brush',
            color: '#FF0000',
            size: 7,
            points: [
              30, 80, 45, 70, 65, 60, 85, 55, 105, 60, 120, 75, 130, 95, 125,
              120, 110, 140, 90, 150, 70, 145, 55, 130, 45, 110,
            ],
          },
          {
            tool: 'pencil',
            color: '#FF0000',
            size: 2,
            points: [
              70, 95, 85, 90, 100, 92, 112, 100, 118, 112, 110, 122, 95, 128,
            ],
          },
          {
            tool: 'brush',
            color: '#FFFFFF',
            size: 4,
            points: [55, 78, 70, 70, 88, 66, 105, 68, 118, 78, 122, 92],
          },
          {
            tool: 'neon',
            color: '#0000FF',
            size: 10,
            points: [
              140, 60, 160, 70, 180, 85, 195, 105, 200, 130, 190, 150, 170, 160,
            ],
          },
          {
            tool: 'brush',
            color: '#FF0000',
            size: 5,
            points: [35, 125, 45, 135, 58, 142, 72, 145, 88, 142],
          },
        ],
      },
    },

    {
      userId: 'testtest1',
      score: 8.5,
      isMine: true,
      drawData: {
        lines: [
          {
            tool: 'brush',
            color: '#00FF00',
            size: 5,
            points: [1, 1, 2, 2, 3, 3, 4, 4],
          },
          {
            tool: 'brush',
            color: '#00FF00',
            size: 5,
            points: [10, 10, 11, 11],
          },
          {
            tool: 'pencil',
            color: '#FFFF00',
            size: 3,
            points: [100, 100, 101, 101],
          },
          { tool: 'brush', color: '#FF00FF', size: 1, points: [0, 0] },
          {
            tool: 'pencil',
            color: '#FFFF00',
            size: 3,
            points: [105, 105, 106, 106],
          },
          {
            tool: 'brush',
            color: '#00FF00',
            size: 8,
            points: [
              60, 80, 85, 65, 115, 60, 145, 70, 165, 95, 170, 125, 155, 150,
              130, 165, 100, 168, 75, 155, 60, 130, 55, 105, 60, 80,
            ],
          },
          {
            tool: 'brush',
            color: '#00FF00',
            size: 6,
            points: [80, 110, 95, 105, 110, 108, 125, 118, 140, 132],
          },
          {
            tool: 'brush',
            color: '#00FF00',
            size: 6,
            points: [75, 135, 92, 132, 110, 134, 128, 142, 145, 150],
          },
          {
            tool: 'pencil',
            color: '#FFFF00',
            size: 3,
            points: [95, 98, 105, 95, 116, 96, 126, 102],
          },
          {
            tool: 'pencil',
            color: '#FFFF00',
            size: 3,
            points: [102, 122, 112, 128, 124, 130, 136, 125],
          },
          {
            tool: 'brush',
            color: '#FF00FF',
            size: 3,
            points: [145, 78, 152, 90, 156, 104, 154, 118],
          },
          {
            tool: 'eraser',
            color: '#FFFFFF',
            size: 16,
            points: [120, 90, 112, 96, 105, 108, 110, 122],
          },
        ],
      },
    },
    {
      userId: '밥아저씨',
      score: 3.9,
      isMine: false,
      drawData: {
        lines: [
          {
            tool: 'neon',
            color: '#00FF00',
            size: 8,
            points: [50, 200, 60, 210, 70, 230],
          },
        ],
      },
    },
    {
      userId: '폴리',
      score: 3.15,
      isMine: false,
      drawData: {
        lines: [
          {
            tool: 'pencil',
            color: '#000000',
            size: 3,
            points: [150, 150, 160, 160],
          },
        ],
      },
    },
    {
      userId: '오렌지',
      score: 2.5,
      isMine: false,
      drawData: {
        lines: [
          {
            tool: 'brush',
            color: '#FFA500',
            size: 10,
            points: [300, 300, 310, 320],
          },
        ],
      },
    },
    {
      userId: '인덕툰',
      score: 1.2,
      isMine: false,
      drawData: {
        lines: [
          {
            tool: 'eraser',
            color: '#FFFFFF',
            size: 20,
            points: [0, 0, 50, 50],
          },
        ],
      },
    },
  ],
};
