import { useRef, useState } from 'react';
import type { KonvaEventObject } from 'konva/lib/Node';

import type { DrawLine } from './types';

export const useDrawing = () => {
  const [lines, setLines] = useState<DrawLine[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const isDrawingRef = useRef(false);

  const handleDown = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (e.evt?.preventDefault) e.evt.preventDefault();

    isDrawingRef.current = true;
    setIsDrawing(true);

    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (!pos) return;

    setLines((prev) => [
      ...prev,
      {
        tool: 'pen',
        color: '#000000',
        size: 5,
        points: [pos.x, pos.y],
      },
    ]);
  };

  const handleMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
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
  };

  const handleUp = () => {
    isDrawingRef.current = false;
    setIsDrawing(false);
  };

  return {
    lines,
    isDrawing,
    handleDown,
    handleMove,
    handleUp,
  };
};
