import { useState, useMemo } from 'react';
import type { Product } from '@/entities/product';
import type { PurchaseStatus } from './types';

interface UseShopPurchaseProps {
  items: Product[];
  totalPrice: number;
  userBalance: number;
  userLevel: number;
}

export const useShopPurchase = ({
  items,
  totalPrice,
  userBalance,
  userLevel,
}: UseShopPurchaseProps) => {
  const [status, setStatus] = useState<PurchaseStatus>('IDLE');

  const { maxItemLevel, missingCost, missingLevel } = useMemo(() => {
    const maxLevel = Math.max(...items.map((item) => item.level));
    return {
      maxItemLevel: maxLevel,
      missingCost: totalPrice - userBalance,
      missingLevel: maxLevel - userLevel,
    };
  }, [items, totalPrice, userBalance, userLevel]);

  const handlePurchase = () => {
    if (userLevel < maxItemLevel) {
      setStatus('FAIL_LEVEL');
      return;
    }
    if (userBalance < totalPrice) {
      setStatus('FAIL_BALANCE');
      return;
    }
    setStatus('SUCCESS');
  };

  return {
    status,
    handlePurchase,
    missingCost,
    missingLevel,
  };
};
