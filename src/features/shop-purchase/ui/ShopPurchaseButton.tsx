import { overlay } from 'overlay-kit';
import { ShopPurchaseModal } from './ShopPurchaseModal';
import { cn } from '@/shared/lib';
import type { Product } from '@/entities/product';

interface ShopPurchaseButtonProps {
  cart: Product[];
  userBalance: number;
  userLevel: number;
  totalPrice: number;
  disabled?: boolean;
}

export const ShopPurchaseButton = ({
  cart,
  userBalance,
  userLevel,
  totalPrice,
  disabled,
}: ShopPurchaseButtonProps) => {
  const handleOpen = () => {
    if (disabled) return;

    overlay.open(({ unmount }) => (
      <ShopPurchaseModal
        onClose={unmount}
        items={cart}
        totalPrice={totalPrice}
        userBalance={userBalance}
        userLevel={userLevel}
      />
    ));
  };

  return (
    <button
      onClick={handleOpen}
      disabled={disabled}
      className={cn(
        'w-[360px] h-[105px] rounded-[30px] text-4xl transition-all duration-200',
        disabled
          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
          : 'bg-gray-900 hover:bg-black text-white hover:scale-[1.02] active:scale-[0.98]',
      )}
    >
      구매하기
    </button>
  );
};
