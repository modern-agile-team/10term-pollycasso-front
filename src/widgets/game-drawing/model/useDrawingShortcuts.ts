import { useEffect } from 'react';

import type { DrawingTool } from '@/features/drawing/model/types';

interface UseDrawingShortcutsProps {
  setActiveTool: (tool: DrawingTool) => void;
  setStrokeWidth: (action: (prev: number) => number) => void;
}

export const useDrawingShortcuts = ({
  setActiveTool,
  setStrokeWidth,
}: UseDrawingShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case '1':
          setActiveTool('pencil');
          break;
        case '2':
          setActiveTool('brush');
          break;
        case '3':
          setActiveTool('neon');
          break;
        case '4':
          setActiveTool('bucket');
          break;
        case '5':
        case 'e':
        case 'E':
          setActiveTool('eraser');
          break;

        case '[':
          setStrokeWidth((prev) => Math.max(1, prev - 5));
          break;
        case ']':
          setStrokeWidth((prev) => Math.min(100, prev + 5));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveTool, setStrokeWidth]);
};
