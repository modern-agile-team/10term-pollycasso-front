import type { ReactNode } from 'react';

interface DetailSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const DetailSection = ({
  title,
  children,
  className = '',
}: DetailSectionProps) => (
  <div
    className={`flex flex-col items-center gap-1.5 min-w-[80px] ${className}`}
  >
    <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
      {title}
    </span>
    {children}
  </div>
);
