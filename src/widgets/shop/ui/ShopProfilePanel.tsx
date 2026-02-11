import { Coin } from '@/assets';
import { CharacterPreview } from '@/entities/character';
import { ShopPurchaseButton } from '@/features/shop';
import { cn } from '@/shared/lib';
import type { CartItem } from '@/features/shop';
import type { Product } from '@/entities/product';

interface ShopProfilePanelProps {
  cart: CartItem[];
  previewItems: Product[];
  userBalance: number;
  userLevel: number;
  onRemoveFromCart: (id: number) => void;
  onResetPreview: () => void;
  onPurchase: () => void;
  isPurchasing: boolean;
}

export const ShopProfilePanel = ({
  cart,
  previewItems,
  userBalance,
  userLevel,
  onRemoveFromCart,
  onResetPreview,
  onPurchase,
  isPurchasing,
}: ShopProfilePanelProps) => {
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const isOverBudget = totalPrice > userBalance;
  const isCartEmpty = cart.length === 0;

  return (
    <div className="flex flex-col justify-between w-[360px] h-[720px]">
      <div className="flex flex-col justify-between items-center w-[360px] h-[590px] bg-[#1E3411]/40 rounded-[30px] p-4">
        <CharacterPreview
          level={userLevel}
          previewItems={previewItems}
          onReset={onResetPreview}
          classNames={{
            container: 'w-[305px] h-[375px]',
            shadow: 'top-[220px]',
            nicknameText: 'text-xl',
          }}
        />

        <div className="flex items-center w-1/2 h-[35px] bg-[#1E3411]/40 rounded-3xl">
          <img src={Coin} className="w-[40px] h-[40px]" alt="Coin" />
          <div className="flex flex-1 justify-center items-center">
            <span className="text-white text-xl">{totalPrice}</span>
            <span className="text-white text-xl mx-1">/</span>
            <span
              className={cn(
                'text-xl transition-colors',
                isOverBudget ? 'text-[#FF7070]' : 'text-white',
              )}
            >
              {userBalance}
            </span>
          </div>
        </div>

        <div className="relative w-[305px] h-[100px] bg-[#1E3411]/40 rounded-3xl pr-2">
          <span className="absolute -top-2 bg-[#81C27E] text-white text-base font-bold px-2 pt-[2px] pb-[2px] rounded-full">
            CART
          </span>
          <div className="w-full h-full overflow-y-auto px-2 pr-4 pt-6 flex flex-col gap-y-2 custom-cart-scrollbar">
            {cart.length === 0 ? (
              <div className="text-white/30 text-xs text-center mt-4">
                장바구니가 비어있습니다.
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between w-full h-[28px] shrink-0 rounded-lg pl-3 pr-1"
                >
                  <div className="flex items-center overflow-hidden">
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="w-4 h-4 bg-[#EB4D3D] rounded-full flex items-center justify-center hover:brightness-110 transition-all shadow-sm border-white border group shrink-0"
                    >
                      <div className="w-2.5 h-[2px] bg-white group-active:scale-90" />
                    </button>
                    <span className="ml-2 text-white text-sm truncate font-medium max-w-[150px]">
                      {item.name}
                    </span>
                  </div>

                  {item.quantity > 1 && (
                    <span className="text-yellow-400 text-xs font-bold shrink-0">
                      x{item.quantity}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ShopPurchaseButton
        cart={cart}
        userBalance={userBalance}
        userLevel={userLevel}
        totalPrice={totalPrice}
        disabled={isCartEmpty || isPurchasing}
        onPurchase={onPurchase}
      />
    </div>
  );
};
