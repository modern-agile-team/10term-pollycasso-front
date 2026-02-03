import type { CSSProperties } from 'react';

const CDN_BASE_URL = import.meta.env.VITE_ASSET_CDN_URL;

export interface FireworkConfig {
  id: string;
  src: string;
  className: string;
  style?: CSSProperties;
}

export const BACKGROUND_FIREWORKS: FireworkConfig[] = [
  {
    id: 'bg-wide',
    src: `${CDN_BASE_URL}/fireworks_wide.webp`,
    className: 'absolute -bottom-10 left-36 w-100 h-100 opacity-50',
  },
  {
    id: 'bg-circle-r',
    src: `${CDN_BASE_URL}/fireworks_circular.webp`,
    className: 'absolute -top-40 -right-36 w-72 h-72',
  },
  {
    id: 'bg-circle-l',
    src: `${CDN_BASE_URL}/fireworks_circular.webp`,
    className: 'absolute -top-40 -left-36 w-72 h-72',
  },
];

export const FOREGROUND_FIREWORKS: FireworkConfig[] = [
  {
    id: 'fg-blue-l',
    src: `${CDN_BASE_URL}/fireworks_blue.webp`,
    className: 'absolute -top-60 -left-10 w-100 h-100',
  },
  {
    id: 'fg-red-l',
    src: `${CDN_BASE_URL}/fireworks_red.webp`,
    className: 'absolute -top-80 left-64 w-92 h-92',
  },
  {
    id: 'fg-blue-r',
    src: `${CDN_BASE_URL}/fireworks_blue.webp`,
    className: 'absolute -top-60 -right-10 w-100 h-100',
    style: { animationDelay: '0.25s' },
  },
  {
    id: 'fg-red-r',
    src: `${CDN_BASE_URL}/fireworks_red.webp`,
    className: 'absolute -top-80 right-64 w-92 h-92',
    style: { animationDelay: '0.25s' },
  },
  {
    id: 'fg-up-l',
    src: `${CDN_BASE_URL}/fireworks_up.webp`,
    className: 'absolute -top-96 left-10 w-72 h-72',
  },
  {
    id: 'fg-up-r',
    src: `${CDN_BASE_URL}/fireworks_up.webp`,
    className: 'absolute -top-96 right-10 w-72 h-72',
  },
];
