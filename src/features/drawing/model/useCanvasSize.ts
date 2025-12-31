import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

export const useCanvasSize = (
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateFromEl = () => {
      const rect = el.getBoundingClientRect();
      setSize({
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
      });
    };

    updateFromEl();

    const ro = new ResizeObserver(() => {
      updateFromEl();
    });

    ro.observe(el);

    return () => {
      ro.disconnect();
    };
  }, [containerRef]);

  return size;
};
