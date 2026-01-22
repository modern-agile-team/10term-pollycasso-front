import {
  TrophyIcon,
  PaintBrushIcon,
  BoltIcon,
  SparklesIcon,
  BeakerIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/solid';
import type { ElementType } from 'react';

export type AchievementID =
  | 'COLOR_MASTER'
  | 'SPEED_RACER'
  | 'MINIMALIST'
  | 'EFFORT_KING'
  | 'DEFAULT';

export interface AchievementStyle {
  label: string;
  icon: ElementType;
  styles: {
    bg: string;
    border: string;
    text: string;
    iconColor: string;
  };
}

export const ACHIEVEMENT_CONFIG: Record<AchievementID, AchievementStyle> = {
  COLOR_MASTER: {
    label: '색상은 내 친구',
    icon: PaintBrushIcon,
    styles: {
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      text: 'text-pink-600',
      iconColor: 'text-pink-500',
    },
  },
  SPEED_RACER: {
    label: '스피드 레이서',
    icon: BoltIcon,
    styles: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      iconColor: 'text-blue-500',
    },
  },
  MINIMALIST: {
    label: '미니멀리스트',
    icon: SparklesIcon,
    styles: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-600',
      iconColor: 'text-gray-400',
    },
  },
  EFFORT_KING: {
    label: '선깎는 노인',
    icon: BeakerIcon,
    styles: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      iconColor: 'text-purple-500',
    },
  },
  DEFAULT: {
    label: '참가상',
    icon: HandThumbUpIcon,
    styles: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      iconColor: 'text-green-500',
    },
  },
};
