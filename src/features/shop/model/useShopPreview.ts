import { useState } from 'react';
import type { Product } from '@/entities/product';

export const useShopPreview = () => {
  const [previewItems, setPreviewItems] = useState<Product[]>([]);

  const wearItem = (product: Product) => {
    setPreviewItems((prev) => {
      const filtered = prev.filter(
        (item) => item.subCategory !== product.subCategory,
      );

      return [...filtered, product];
    });
  };

  const resetPreview = () => {
    setPreviewItems([]);
  };

  return { previewItems, wearItem, resetPreview };
};
