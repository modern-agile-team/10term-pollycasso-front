import { useState } from 'react';

import type { DrawingTool } from '@/entities/drawing';

const INITIAL_TOOL_STATE = {
  TOOL: 'pencil' as DrawingTool,
  WIDTH: 5,
  COLOR: '#000000',
};

export const useDrawingTools = () => {
  const [activeTool, setActiveTool] = useState<DrawingTool>(
    INITIAL_TOOL_STATE.TOOL,
  );
  const [strokeWidth, setStrokeWidth] = useState<number>(
    INITIAL_TOOL_STATE.WIDTH,
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    INITIAL_TOOL_STATE.COLOR,
  );

  return {
    activeTool,
    setActiveTool,
    strokeWidth,
    setStrokeWidth,
    selectedColor,
    setSelectedColor,
  };
};
