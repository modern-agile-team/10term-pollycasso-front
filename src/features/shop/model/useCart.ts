import { useState } from 'react';
import type { Product } from '@/entities/product';
import { useSound } from '@/entities/sound';
import { SoundManager } from '@/shared/api/sound/manager';
import { SOUND_ASSETS } from '@/shared/api/sound/assets';
import { SHOP_CATEGORIES } from '../constants/shop.constants';

export interface CartItem extends Product {
  quantity: number;
}

export const useCart = () => {
  const { sfxVolume, isMuted } = useSound();
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const isConsumable = product.subCategory === SHOP_CATEGORIES.ITEM;

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (isConsumable && existingItem) {
        if (!isMuted)
          SoundManager.playSfx(SOUND_ASSETS.SFX.SHOP_CART, sfxVolume);
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      if (!isConsumable && existingItem) {
        return prev;
      }

      if (!isMuted) SoundManager.playSfx(SOUND_ASSETS.SFX.SHOP_CART, sfxVolume);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, clearCart };
};
