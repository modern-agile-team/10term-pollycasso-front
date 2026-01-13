import { useCallback, useRef, useState } from 'react';
import type { KonvaEventObject } from 'konva/lib/Node';

import { performFloodFill } from '../utils/floodFillUtils';
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

      const stage = e.target.getStage();
      const pos = stage?.getPointerPosition();

      if (!pos || !stage) return;

      if (tool === 'bucket') {
        const backgroundLayer = stage.getLayers()[0];

        backgroundLayer.hide();

        const width = stage.width();
        const height = stage.height();

        const tempCanvas = stage.toCanvas({
          pixelRatio: 1,
          x: 0,
          y: 0,
          width,
          height,
        });

        backgroundLayer.show();

        const ctx = tempCanvas.getContext('2d');
        if (!ctx) return;

        const imageData = ctx.getImageData(0, 0, width, height);

        const filledImage = performFloodFill(
          imageData,
          Math.floor(pos.x),
          Math.floor(pos.y),
          color,
        );

        if (filledImage) {
          setLines((prev) => [
            ...prev,
            {
              tool: 'bucket',
              color,
              size: 0,
              points: [0, 0],
              filledImage,
            },
          ]);
        }

        return;
      }

      isDrawingRef.current = true;
      setIsDrawing(true);

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
        if (last.tool === 'bucket') return prev;

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
