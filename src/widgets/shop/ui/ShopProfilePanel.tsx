import { Bird, Coin } from '@/assets';
import type { Product } from '@/entities/product';

interface ShopProfilePanelProps {
  cart: Product[];
  onRemoveFromCart: (id: number) => void;
}

export const ShopProfilePanel = ({
  cart,
  onRemoveFromCart,
}: ShopProfilePanelProps) => {
  return (
    <div className="flex flex-col justify-between w-[360px] h-[720px]">
      <div className="flex flex-col justify-between items-center w-[360px] h-[590px] bg-[#1E3411]/40 rounded-[30px] p-4">
        <div className="flex flex-col items-center w-[305px] h-[375px] bg-white rounded-3xl p-6">
          <div className="flex w-full h-[45px] gap-x-2">
            <div className="w-[45px] h-[45px] bg-yellow-300 rounded-full"></div>
            <div className="flex flex-col">
              <span className="text-black text-base">Lv.3</span>
              <span className="text-[#535353] text-lg">폴리칵소</span>
            </div>
          </div>

          <img
            src={Bird}
            className="flex-1 flex items-center justify-center my-2"
            alt="Character"
          />

          <div className="absolute bottom-[450px] w-[180px] h-[40px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,transparent_70%)]" />

          <button className="flex items-center justify-center rounded-full text-xs px-3 py-1 bg-[#EF5F52] text-white ">
            Reset
          </button>
        </div>

        <div className="flex items-center w-1/2 h-[35px] bg-[#1E3411]/40 rounded-3xl">
          <img src={Coin} className="w-[40px] h-[40px]" alt="Coin" />
          <div className="flex flex-1 justify-center items-center">
            <span className="text-white text-xl">120</span>
            <span className="text-white text-xl mx-1">/</span>
            <span className="text-[#FF7070] text-xl">240</span>
          </div>
        </div>

        <div className="relative w-[305px] h-[100px] bg-[#1E3411]/40 rounded-3xl">
          <span className="absolute -top-2 bg-[#81C27E] text-white text-base font-bold px-2 pt-[2px] pb-[2px] rounded-full">
            CART
          </span>
          <div className="w-full h-full overflow-y-auto px-2 pt-6 flex flex-col gap-y-2">
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

      <button className="w-[360px] h-[105px] bg-gray-900 hover:bg-black text-white rounded-[30px] text-4xl">
        구매하기
      </button>
    </div>
  );
};
