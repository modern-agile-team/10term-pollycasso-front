import { GameCanvas } from '@/entities/drawing';

import { useDrawing } from '../model/useDrawing';
import { useDrawingTools } from '../model/useDrawingTools';
import { useDrawingShortcuts } from '../model/useDrawingShortcuts';
import { DrawingToolbox } from './DrawingToolbox';
import { DrawingHistoryButtons } from './DrawingHistoryButtons';
import { ShortcutGuide } from './ShortcutGuide';

export const DrawingPhase = () => {
  const {
    activeTool,
    setActiveTool,
    strokeWidth,
    setStrokeWidth,
    selectedColor,
    setSelectedColor,
  } = useDrawingTools();

  const { lines, undo, redo, handleDown, handleMove, handleUp } = useDrawing({
    tool: activeTool,
    color: selectedColor,
    size: strokeWidth,
  });

  useDrawingShortcuts({ setActiveTool, setStrokeWidth });

  return (
    <>
      <div className="absolute -top-12 left-6 z-30">
        <ShortcutGuide />
      </div>

      <GameCanvas
        readOnly={false}
        activeTool={activeTool}
        strokeWidth={strokeWidth}
        lines={lines}
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
      />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <DrawingToolbox
          activeTool={activeTool}
          onToolChange={setActiveTool}
          strokeWidth={strokeWidth}
          onWidthChange={setStrokeWidth}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />
        <DrawingHistoryButtons undo={undo} redo={redo} />
      </div>
    </>
  );
};
