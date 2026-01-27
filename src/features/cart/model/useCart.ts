import { useState } from 'react';
import type { Product } from '@/entities/product';

export const useCart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const isExist = cart.some((item) => item.id === product.id);

    if (!isExist) {
      setCart((prev) => [...prev, product]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  return { cart, addToCart, removeFromCart };
};
