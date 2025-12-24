import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';
import { COLOR_MAP } from '../constants/colors';

interface MenuButtonProps {
  icon: ReactNode;
  label: string;
  color: 'RED' | 'YELLOW' | 'BLACK';
  onClick?: () => void;
}

export const MenuButton = ({
  icon,
  label,
  color,
  onClick,
}: MenuButtonProps) => {
  return (
    <div className="p-2 bg-white/50 rounded-xl h-full">
      <button
        onClick={onClick}
        className={cn(
          'flex justify-between w-full h-full items-center py-2 px-4 rounded-xl transition-colors',
          COLOR_MAP[color],
        )}
      >
        <div className="w-8 h-8 text-white">{icon}</div>
        <span className="text-2xl font-bold text-white">{label}</span>
      </button>
    </div>
  );
};
