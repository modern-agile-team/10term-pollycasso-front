import type { ComponentRef } from 'react';
import { useRef } from 'react';
import { Layer, Line, Stage } from 'react-konva';

import { Mannequin } from '@/assets';
import { CanvasBackground } from '@/widgets/game-drawing/ui/CanvasBackground';
import { useCanvasSize } from '../model/useCanvasSize';
import { useDrawing } from '../model/useDrawing';

export const GameCanvas = () => {
  const containerRef = useRef<ComponentRef<'div'>>(null);
  const size = useCanvasSize(containerRef);
  const { lines, handleDown, handleMove, handleUp } = useDrawing();

  return (
    <div
      ref={containerRef}
      style={{ touchAction: 'none' }}
      className="flex-1 w-full h-full flex items-center justify-center text-gray-300 bg-gray-50 m-6 rounded-xl border border-dashed border-gray-300 overflow-hidden relative"
    >
      <div className="absolute inset-0">
        {size.width > 0 && size.height > 0 ? (
          <Stage
            width={size.width}
            height={size.height}
            onMouseDown={handleDown}
            onMouseMove={handleMove}
            onMouseUp={handleUp}
            onMouseLeave={handleUp}
            onTouchStart={handleDown}
            onTouchMove={handleMove}
            onTouchEnd={handleUp}
            onTouchCancel={handleUp}
          >
            <Layer>
              <CanvasBackground
                src={Mannequin}
                width={size.width}
                height={size.height}
              />
            </Layer>

            <Layer>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.color}
                  strokeWidth={line.size}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                  }
                />
              ))}
            </Layer>
          </Stage>
        ) : (
          <span>Canvas Area</span>
        )}
      </div>
    </div>
  );
};
