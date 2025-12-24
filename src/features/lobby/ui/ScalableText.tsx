import type { ReactNode } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/shared/lib';

interface ScalableTextProps {
  children: ReactNode;
  className?: string;
}

const ScalableText = ({ children, className = '' }: ScalableTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState<number>(1);

  useLayoutEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;

      const newScale =
        containerWidth < textWidth ? containerWidth / textWidth : 1;
      setScale(newScale);
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full h-full flex items-center overflow-hidden',
        className,
      )}
    >
      <span
        ref={textRef}
        className="origin-left whitespace-nowrap block w-max"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </span>
    </div>
  );
};

export default ScalableText;
