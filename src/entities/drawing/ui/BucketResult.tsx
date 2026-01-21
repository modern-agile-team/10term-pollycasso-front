import { useEffect, useRef } from 'react';
import { Image as KonvaImage } from 'react-konva';
import Konva from 'konva';

interface BucketResultProps {
  image: HTMLImageElement;
}

export const BucketResult = ({ image }: BucketResultProps) => {
  const imageRef = useRef<Konva.Image>(null);

  useEffect(() => {
    const node = imageRef.current;
    if (!node) return;

    node.clearCache();

    node.cache({
      pixelRatio: 1,
      imageSmoothingEnabled: true,
    });

    node.getLayer()?.batchDraw();
  }, [image]);

  return (
    <KonvaImage
      image={image}
      ref={imageRef}
      x={0}
      y={0}
      listening={false}
      filters={[Konva.Filters.Blur, Konva.Filters.Threshold]}
      blurRadius={4}
      threshold={0.6}
    />
  );
};
