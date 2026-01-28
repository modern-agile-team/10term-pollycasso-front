import { Bird, Coin } from '@/assets';
import type { Product } from '@/entities/product';
import { ShopPurchaseButton } from '@/features/shop-purchase';
import { cn } from '@/shared/lib';

const USER_BALANCE = 120;
const USER_LEVEL = 3; // 추가됨

interface ShopProfilePanelProps {
  cart: Product[];
  previewItems: Product[];
  onRemoveFromCart: (id: number) => void;
  onResetPreview: () => void;
}

export const ShopProfilePanel = ({
  cart,
  previewItems,
  onRemoveFromCart,
  onResetPreview,
}: ShopProfilePanelProps) => {
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  const isOverBudget = totalPrice > USER_BALANCE;
  const isCartEmpty = cart.length === 0;

  return (
    <div className="flex flex-col justify-between w-[360px] h-[720px]">
      <div className="flex flex-col justify-between items-center w-[360px] h-[590px] bg-[#1E3411]/40 rounded-[30px] p-4">
        <div className="flex flex-col items-center w-[305px] h-[375px] bg-white rounded-3xl p-6 pb-4 relative">
          <div className="flex w-full h-[45px] gap-x-2 z-20">
            <div className="w-[45px] h-[45px] bg-yellow-300 rounded-full"></div>
            <div className="flex flex-col">
              <span className="text-black text-base">Lv.{USER_LEVEL}</span>
              <span className="text-[#535353] text-lg">폴리칵소</span>
            </div>
          </div>

          <div className="relative flex-1 w-full flex items-center justify-center my-2 z-10">
            <img
              src={Bird}
              className="absolute w-[250px] h-[250px] object-contain z-10"
              alt="Character"
            />

            {previewItems.map((item) => (
              <img
                key={item.id}
                src={item.image}
                className="absolute w-[250px] h-[250px] object-contain z-20 pointer-events-none"
                alt={item.name}
              />
            ))}
          </div>

          <div className="absolute top-[295px] w-[180px] h-[40px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,transparent_70%)] z-30" />

          <button
            onClick={onResetPreview}
            className="flex items-center justify-center rounded-full text-xs px-3 py-1 bg-[#EF5F52] text-white z-20 hover:bg-[#d64538] transition-colors"
          >
            Reset
          </button>
        </div>

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
              {USER_BALANCE}
            </span>
          </div>
        </div>

        <div className="relative w-[305px] h-[100px] bg-[#1E3411]/40 rounded-3xl pr-2">
          <span className="absolute -top-2 bg-[#81C27E] text-white text-base font-bold px-2 pt-[2px] pb-[2px] rounded-full">
            CART
          </span>
          <div className="w-full h-full overflow-y-auto px-2 pr-4 pt-6 flex flex-col gap-y-2 custom-cart-scrollbar">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-start w-full h-[28px] shrink-0 rounded-lg pl-3 pr-1"
              >
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="w-4 h-4 bg-[#EB4D3D] rounded-full flex items-center justify-center hover:brightness-110 transition-all shadow-sm border-white border group"
                >
                  <div className="w-2.5 h-[2px] bg-white group-active:scale-90" />
                </button>
                <span className="ml-2 text-white text-sm truncate font-medium max-w-[200px]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ShopPurchaseButton
        cart={cart}
        userBalance={USER_BALANCE}
        userLevel={USER_LEVEL} // 추가됨
        totalPrice={totalPrice}
        disabled={isCartEmpty}
        // isOverBudget은 이전 단계에서 ShopPurchaseButton Props에서 제거했으므로 뺐습니다.
      />
    </div>
  );
};
