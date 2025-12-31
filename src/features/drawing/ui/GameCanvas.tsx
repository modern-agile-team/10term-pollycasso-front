import { useEffect, useRef, useState } from 'react';
import { Layer, Line, Stage } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';

import { Mannequin } from '@/assets';
import { CanvasBackground } from '@/widgets/game-drawing/ui/CanvasBackground';
import type { DrawLine } from '../model/types';

export const GameCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });

  const [lines, setLines] = useState<DrawLine[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateFromEl = () => {
      const rect = el.getBoundingClientRect();
      setSize({
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
      });
    };

    updateFromEl();

    const ro = new ResizeObserver(() => {
      updateFromEl();
    });

    ro.observe(el);

    return () => {
      ro.disconnect();
    };
  }, []);

  const handleDown = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (e.evt?.preventDefault) e.evt.preventDefault();

    isDrawingRef.current = true;
    setIsDrawing(true);

    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (!pos) return;

    setLines((prev) => [
      ...prev,
      {
        tool: 'pen',
        color: '#000000',
        size: 5,
        points: [pos.x, pos.y],
      },
    ]);
  };

  const handleMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!isDrawingRef.current) return;

    if (e.evt?.preventDefault) e.evt.preventDefault();

    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (!point) return;

    setLines((prev) => {
      if (prev.length === 0) return prev;

      const last = prev[prev.length - 1];
      const updatedLast: DrawLine = {
        ...last,
        points: [...last.points, point.x, point.y],
      };

      return [...prev.slice(0, -1), updatedLast];
    });
  };

  const handleUp = () => {
    isDrawingRef.current = false;
    setIsDrawing(false);
  };

  return (
    <div
      ref={containerRef}
      style={{ touchAction: 'none' }}
      className="flex-1 w-full h-full flex items-center justify-center text-gray-300 bg-gray-50 m-6 rounded-xl border border-dashed border-gray-300 overflow-hidden relative"
    >
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
  );
};
