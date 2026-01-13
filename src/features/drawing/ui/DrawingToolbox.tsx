import { ACTIVE_COLOR } from '../constants/drawingConstants';
import type { DrawingTool } from '../model/types';
import { BrushSizeSlider } from './BrushSizeSlider';
import { ColorPalette } from './ColorPalette';
import { ToolSelector } from './ToolSelector';

interface DrawingToolboxProps {
  activeTool: DrawingTool;
  strokeWidth: number;
  selectedColor: string;
  onToolChange: (tool: DrawingTool) => void;
  onWidthChange: (width: number) => void;
  onColorChange: (color: string) => void;
}

export const DrawingToolbox = ({
  activeTool,
  strokeWidth,
  selectedColor,
  onToolChange,
  onWidthChange,
  onColorChange,
}: DrawingToolboxProps) => {
  const isEraserActive = activeTool === 'eraser';

  return (
    <div className="flex items-center w-[920px] h-[90px] px-8 py-5 bg-gradient-to-r rounded-3xl from-[#909090] to-[#D4D4D4] gap-x-4 shadow-[inset_0_4px_10px_rgba(0,0,0,0.2)]">
      <ToolSelector
        activeTool={activeTool}
        onSelectTool={onToolChange}
        activeColor={ACTIVE_COLOR}
      />

      <BrushSizeSlider
        strokeWidth={strokeWidth}
        setStrokeWidth={onWidthChange}
        selectedColor={selectedColor}
        activeColor={ACTIVE_COLOR}
      />

      <button
        onClick={() => onToolChange('eraser')}
        className={`w-[150px] h-full bg-white rounded-2xl text-xl font-bold flex justify-center items-center cursor-pointer shadow-sm hover:bg-gray-50 transition-all ${
          isEraserActive ? 'text-gray-900' : 'text-[#909090]'
        }`}
        style={{
          boxShadow: isEraserActive ? `0 0 0 3px ${ACTIVE_COLOR}` : 'none',
        }}
      >
        ERASE
      </button>

      <div className="flex-1 h-full bg-white rounded-2xl flex justify-center items-center px-4 shadow-sm">
        <ColorPalette
          selectedColor={selectedColor}
          onSelectColor={onColorChange}
          activeColor={ACTIVE_COLOR}
        />
      </div>
    </div>
  );
};
