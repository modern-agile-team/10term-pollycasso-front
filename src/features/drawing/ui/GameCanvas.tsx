import type { ComponentRef } from 'react';
import { useRef } from 'react';
import { Layer, Line, Stage } from 'react-konva';

import { Mannequin } from '@/assets';
import type { DrawingTool } from '../model/types';
import { useCanvasSize } from '../model/useCanvasSize';
import { useDrawing } from '../model/useDrawing';
import { useTextureLoader } from '../model/useTextureLoader';
import { BucketResult } from './BucketResult';
import { CanvasBackground } from './CanvasBackground';
import { TexturedLine } from './TexturedLine';

interface GameCanvasProps {
  activeTool: DrawingTool;
  strokeWidth: number;
  selectedColor: string;
}

export const GameCanvas = ({
  activeTool,
  strokeWidth,
  selectedColor,
}: GameCanvasProps) => {
  const containerRef = useRef<ComponentRef<'div'>>(null);
  const size = useCanvasSize(containerRef);

  const { textures } = useTextureLoader();

  const { lines, handleDown, handleMove, handleUp } = useDrawing({
    tool: activeTool,
    color: selectedColor,
    size: strokeWidth,
  });

  const isCanvasReady = size.width > 0 && size.height > 0;

  return (
    <div
      ref={containerRef}
      style={{ touchAction: 'none' }}
      className="w-3/5 h-4/5 flex items-center justify-center text-gray-300 bg-gray-50 mx-6 rounded-xl border border-dashed border-gray-300 overflow-hidden relative"
    >
      <div className="absolute inset-0">
        {isCanvasReady && (
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
              {lines.map((line, i) => {
                if (line.tool === 'bucket' && line.filledImage) {
                  return <BucketResult key={i} image={line.filledImage} />;
                }

                const texture = textures[line.tool];

                if (texture && line.tool !== 'eraser') {
                  return (
                    <TexturedLine
                      key={i}
                      points={line.points}
                      color={line.color}
                      size={line.size}
                      textureImage={texture}
                      spacing={line.tool === 'pencil' ? 0.3 : 0.1}
                    />
                  );
                }

                if (line.tool === 'neon') {
                  return (
                    <Line
                      key={i}
                      points={line.points}
                      stroke={line.color}
                      strokeWidth={line.size}
                      tension={0.5}
                      lineCap="round"
                      lineJoin="round"
                      shadowColor={line.color}
                      shadowBlur={15}
                      shadowOpacity={1}
                      shadowOffset={{ x: 0, y: 0 }}
                      globalCompositeOperation="source-over"
                    />
                  );
                }

                return (
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
                );
              })}
            </Layer>
          </Stage>
        )}
      </div>
    </div>
  );
};
