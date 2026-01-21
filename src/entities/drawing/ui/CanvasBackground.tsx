import { useEffect, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';

interface CanvasBackgroundProps {
  src: string;
  width: number;
  height: number;
}

export const CanvasBackground = ({
  src,
  width,
  height,
}: CanvasBackgroundProps) => {
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });
  const [imgConfig, setImgConfig] = useState({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    let cancelled = false;

    const img = new window.Image();
    img.src = src;

    img.onload = () => {
      if (cancelled) return;
      setImage(img);
      setNaturalSize({ w: img.width, h: img.height });
    };

    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    if (!naturalSize.w || !naturalSize.h) return;
    if (width <= 0 || height <= 0) return;

    const imgRatio = naturalSize.w / naturalSize.h;
    const canvasRatio = width / height;

    let renderW: number;
    let renderH: number;
    let x: number;
    let y: number;

    if (canvasRatio > imgRatio) {
      renderH = height;
      renderW = height * imgRatio;
      x = (width - renderW) / 2;
      y = 0;
    } else {
      renderW = width;
      renderH = width / imgRatio;
      x = 0;
      y = (height - renderH) / 2;
    }

    setImgConfig({ x, y, w: renderW, h: renderH });
  }, [naturalSize, width, height]);

  return (
    <KonvaImage
      image={image}
      x={imgConfig.x}
      y={imgConfig.y}
      width={imgConfig.w}
      height={imgConfig.h}
      listening={false}
    />
  );
};
