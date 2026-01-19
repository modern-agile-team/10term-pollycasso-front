import type { ComponentRef } from 'react';
import { useRef, useState } from 'react';
import { Circle, Layer, Line, Stage } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';

import { Mannequin } from '@/assets';
import type { DrawingTool, DrawLine } from '../model/types';
import { useCanvasSize } from '../model/useCanvasSize';
import { useTextureLoader } from '../model/useTextureLoader';
import { BucketResult } from './BucketResult';
import { CanvasBackground } from './CanvasBackground';
import { TextureBrushLine } from './TextureBrushLine';

type KonvaHandler = (event: KonvaEventObject<MouseEvent | TouchEvent>) => void;

interface GameCanvasProps {
  activeTool: DrawingTool;
  strokeWidth: number;
  lines: DrawLine[];
  onMouseDown: KonvaHandler;
  onMouseMove: KonvaHandler;
  onMouseUp: () => void;
}

export const GameCanvas = ({
  activeTool,
  strokeWidth,
  lines,
  onMouseDown,
  onMouseMove,
  onMouseUp,
}: GameCanvasProps) => {
  const containerRef = useRef<ComponentRef<'div'>>(null);
  const size = useCanvasSize(containerRef);
  const { textures } = useTextureLoader();

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const isCanvasReady = size.width > 0 && size.height > 0;

  const handleMouseMoveInternal: KonvaHandler = (event) => {
    const stage = event.target.getStage();
    const position = stage?.getPointerPosition();

    if (position) {
      setCursorPos({ x: position.x, y: position.y });
    }

    onMouseMove(event);
  };

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
            onMouseDown={onMouseDown}
            onMouseMove={handleMouseMoveInternal}
            onMouseUp={onMouseUp}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              onMouseUp();
            }}
            onTouchStart={onMouseDown}
            onTouchMove={handleMouseMoveInternal}
            onTouchEnd={onMouseUp}
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
                    <TextureBrushLine
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

            {/* 브러시 크기에 따른 마우스 포인터 */}
            <Layer>
              {isHovering && activeTool !== 'bucket' && (
                <Circle
                  x={cursorPos.x}
                  y={cursorPos.y}
                  radius={strokeWidth / 16}
                  fill={activeTool === 'eraser' ? 'white' : undefined}
                  stroke="gray"
                  strokeWidth={1}
                  opacity={0.5}
                  listening={false}
                />
              )}
            </Layer>
          </Stage>
        )}
      </div>
    </div>
  );
};
