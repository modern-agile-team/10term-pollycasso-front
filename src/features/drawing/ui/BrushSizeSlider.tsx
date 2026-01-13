import { useState } from 'react';

import { BRUSH_SIZES, DRAWING_CONSTANTS } from '../constants/drawingConstants';
import { getSliderPercentage, isWhiteColor } from '../utils/colorUtils';

interface BrushSizeSliderProps {
  strokeWidth: number;
  setStrokeWidth: (size: number) => void;
  selectedColor: string;
  activeColor: string;
}

export const BrushSizeSlider = ({
  strokeWidth,
  setStrokeWidth,
  selectedColor,
  activeColor,
}: BrushSizeSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="flex flex-col justify-between w-[175px] h-full">
      <div className="flex justify-between items-center px-2">
        {BRUSH_SIZES.map((size) => (
          <div
            key={size}
            onClick={() => setStrokeWidth(size)}
            className="w-[22px] h-[22px] rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm transition-transform hover:scale-110"
            style={{
              boxShadow:
                !isDragging && strokeWidth === size
                  ? `0 0 0 2px ${activeColor}`
                  : 'none',
            }}
          >
            <div
              className={`rounded-full transition-colors ${
                isWhiteColor(selectedColor)
                  ? 'shadow-inner shadow-gray-400'
                  : ''
              }`}
              style={{
                width: Math.min(Math.max(size * 0.2 + 4, 6), 20),
                height: Math.min(Math.max(size * 0.2 + 4, 6), 20),
                backgroundColor: selectedColor,
              }}
            />
          </div>
        ))}
      </div>

      <div className="w-full h-[22px] bg-white rounded-lg flex items-center px-2 shadow-sm cursor-pointer relative">
        <div className="relative w-full h-[6px]">
          <div
            className={`w-full h-full rounded-full opacity-90 transition-colors ${
              isWhiteColor(selectedColor) ? 'shadow-inner shadow-gray-400' : ''
            }`}
            style={{ backgroundColor: selectedColor }}
          />

          <div
            className="absolute top-[-8px] bottom-[-8px] w-[2px] bg-black pointer-events-none z-20"
            style={{
              left: `${getSliderPercentage(strokeWidth)}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {isDragging && (
              <div className="absolute top-[24px] left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap">
                {strokeWidth}
              </div>
            )}
          </div>

          <input
            type="range"
            min={DRAWING_CONSTANTS.MIN_SIZE}
            max={DRAWING_CONSTANTS.MAX_SIZE}
            value={strokeWidth}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="absolute top-[-8px] left-0 w-full h-[22px] opacity-0 cursor-pointer z-30"
          />
        </div>
      </div>
    </div>
  );
};
