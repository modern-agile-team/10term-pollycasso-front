import { useEffect, useState } from 'react';

import { BrushTexture, PencilTexture } from '@/assets';

export type TextureMap = Record<string, HTMLImageElement | null>;

const texturePaths = {
  pencil: PencilTexture,
  brush: BrushTexture,
};

export const useTextureLoader = () => {
  const [textures, setTextures] = useState<TextureMap>({
    pencil: null,
    brush: null,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const promises = Object.entries(texturePaths).map(([key, path]) => {
        return new Promise<[string, HTMLImageElement]>((resolve, reject) => {
          const img = new Image();
          img.src = path;
          img.onload = () => resolve([key, img]);
          img.onerror = reject;
        });
      });

      try {
        const results = await Promise.all(promises);
        const newTextures = results.reduce((acc, [key, img]) => {
          acc[key] = img;
          return acc;
        }, {} as TextureMap);

        setTextures(newTextures);
        setIsLoaded(true);
      } catch (error) {}
    };

    loadImages();
  }, []);

  return { textures, isLoaded };
};
