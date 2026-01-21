import { useCallback, useEffect, useRef, useState } from 'react';
import type { KonvaEventObject } from 'konva/lib/Node';

import { performFloodFill } from '../utils/floodFillUtils';
import type { DrawLine } from '@/entities/drawing';

interface UseDrawingProps {
  tool: DrawLine['tool'];
  color: string;
  size: number;
}

const SCALE_FACTOR = 0.25;

export const useDrawing = ({ tool, color, size }: UseDrawingProps) => {
  const [lines, setLines] = useState<DrawLine[]>([]);
  const [redoStack, setRedoStack] = useState<DrawLine[]>([]);

  const [isDrawing, setIsDrawing] = useState(false);
  const isDrawingRef = useRef(false);

  const undo = useCallback(() => {
    if (lines.length === 0 || isDrawingRef.current) return;

    // 마지막 선을 가져와서 Redo 스택에 추가
    const lastLine = lines[lines.length - 1];
    setRedoStack((prev) => [...prev, lastLine]);

    // Lines 스택에서 마지막 선 제거
    setLines((prev) => prev.slice(0, -1));
  }, [lines]);

  const redo = useCallback(() => {
    if (redoStack.length === 0 || isDrawingRef.current) return;

    // Redo 스택의 마지막 요소를 다시 복구
    const lineToRestore = redoStack[redoStack.length - 1];
    setLines((prev) => [...prev, lineToRestore]);

    // Redo 스택에서 제거
    setRedoStack((prev) => prev.slice(0, -1));
  }, [redoStack]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDrawingRef.current) return;

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      if (isCtrlOrCmd && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }

      if (isCtrlOrCmd && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const handleDown = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (e.evt?.preventDefault) e.evt.preventDefault();

      const stage = e.target.getStage();
      const pos = stage?.getPointerPosition();
      if (!pos || !stage) return;

      setRedoStack([]);

      if (tool === 'bucket') {
        const backgroundLayer = stage.getLayers()[0];
        backgroundLayer.hide();

        const tempCanvas = stage.toCanvas({
          pixelRatio: 1,
          x: 0,
          y: 0,
          width: stage.width(),
          height: stage.height(),
        });

        backgroundLayer.show();

        const ctx = tempCanvas.getContext('2d');
        if (!ctx) return;

        const imageData = ctx.getImageData(0, 0, stage.width(), stage.height());
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
    setRedoStack([]);
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
    redo,
  };
};
