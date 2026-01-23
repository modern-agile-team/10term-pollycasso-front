import type { CSSProperties } from 'react';

import {
  BlueFireworks,
  CircularFireworks,
  RedFireworks,
  UpFireworks,
  WideFireworks,
} from '@/assets';

export interface FireworkConfig {
  id: string;
  src: string;
  className: string;
  style?: CSSProperties;
}

export const BACKGROUND_FIREWORKS: FireworkConfig[] = [
  {
    id: 'bg-wide',
    src: WideFireworks,
    className: 'absolute -bottom-10 left-36 w-100 h-100 opacity-50',
  },
  {
    id: 'bg-circle-r',
    src: CircularFireworks,
    className: 'absolute -top-40 -right-36 w-72 h-72',
  },
  {
    id: 'bg-circle-l',
    src: CircularFireworks,
    className: 'absolute -top-40 -left-36 w-72 h-72',
  },
];

export const FOREGROUND_FIREWORKS: FireworkConfig[] = [
  {
    id: 'fg-blue-l',
    src: BlueFireworks,
    className: 'absolute -top-60 -left-10 w-100 h-100',
  },
  {
    id: 'fg-red-l',
    src: RedFireworks,
    className: 'absolute -top-80 left-64 w-92 h-92',
  },
  {
    id: 'fg-blue-r',
    src: BlueFireworks,
    className: 'absolute -top-60 -right-10 w-100 h-100',
    style: { animationDelay: '0.25s' },
  },
  {
    id: 'fg-red-r',
    src: RedFireworks,
    className: 'absolute -top-80 right-64 w-92 h-92',
    style: { animationDelay: '0.25s' },
  },
  {
    id: 'fg-up-l',
    src: UpFireworks,
    className: 'absolute -top-96 left-10 w-72 h-72',
  },
  {
    id: 'fg-up-r',
    src: UpFireworks,
    className: 'absolute -top-96 right-10 w-72 h-72',
  },
];
