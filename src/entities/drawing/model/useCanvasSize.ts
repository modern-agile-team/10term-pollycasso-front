import type { ComponentRef, RefObject } from 'react';
import { useEffect, useState } from 'react';

export const useCanvasSize = (
  containerRef: RefObject<ComponentRef<'div'> | null>,
) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const updateSize = () => {
      const rect = containerElement.getBoundingClientRect();
      setSize({
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
      });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(containerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return size;
};
