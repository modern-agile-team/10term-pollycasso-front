import { useCallback, useRef, useState } from 'react';
import type { KonvaEventObject } from 'konva/lib/Node';

import type { DrawLine } from './types';

interface UseDrawingProps {
  tool: DrawLine['tool'];
  color: string;
  size: number;
}

const SCALE_FACTOR = 0.25;

export const useDrawing = ({ tool, color, size }: UseDrawingProps) => {
  const [lines, setLines] = useState<DrawLine[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const isDrawingRef = useRef(false);

  const handleDown = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (e.evt?.preventDefault) e.evt.preventDefault();

      isDrawingRef.current = true;
      setIsDrawing(true);

      const stage = e.target.getStage();
      const pos = stage?.getPointerPosition();
      if (!pos) return;

      setLines((prev) => [
        ...prev,
        {
          tool,
          color: tool === 'eraser' ? '#000000' : color,
          size: size * SCALE_FACTOR,
          points: [pos.x, pos.y],
        },
      ]);
    },

    [tool, color, size],
  );

  const handleMove = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (!isDrawingRef.current) return;

      if (e.evt?.preventDefault) e.evt.preventDefault();

      const stage = e.target.getStage();
      const point = stage?.getPointerPosition();
      if (!point) return;

      setLines((prev) => {
        if (prev.length === 0) return prev;

        const last = prev[prev.length - 1];
        const updatedLast: DrawLine = {
          ...last,
          points: [...last.points, point.x, point.y],
        };

        return [...prev.slice(0, -1), updatedLast];
      });
    },
    [],
  );

  const handleUp = useCallback(() => {
    isDrawingRef.current = false;
    setIsDrawing(false);
  }, []);

  const clearCanvas = useCallback(() => {
    setLines([]);
  }, []);

  const undo = useCallback(() => {
    setLines((prev) => prev.slice(0, -1));
  }, []);

  return {
    lines,
    setLines,
    isDrawing,
    handleDown,
    handleMove,
    handleUp,
    clearCanvas,
    undo,
  };
};
