import type { DrawData } from '@/entities/drawing';

interface EvaluatingContext {
  drawings: Record<string, DrawData>;
}

export const MOCK_EVALUATING: EvaluatingContext = {
  drawings: {
    'd-101': {
      lines: [
        {
          tool: 'pencil',
          color: '#000000',
          size: 5,
          points: [100, 100, 200, 200, 150, 300],
        },
      ],
    },
    'd-102': {
      lines: [
        {
          tool: 'pencil',
          color: '#ff0000',
          size: 10,
          points: [300, 100, 300, 400],
        },
      ],
    },
    'd-103': {
      lines: [
        { tool: 'neon', color: '#0000ff', size: 8, points: [50, 400, 400, 50] },
      ],
    },
  },
};
