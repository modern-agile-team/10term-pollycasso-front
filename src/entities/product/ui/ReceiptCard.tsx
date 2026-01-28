import type { Product } from '../model/types';

interface ReceiptCardProps {
  product: Product;
}

export const ReceiptCard = ({ product }: ReceiptCardProps) => {
  return (
    <div className="flex flex-col items-center w-[160px] h-[220px] bg-white border-[3px] border-[#52D843] rounded-[20px] p-3 shadow-sm shrink-0">
      <div className="w-full flex items-start gap-x-2 mb-1">
        <div className="w-[30px] h-[30px] bg-yellow-300 rounded-full shrink-0 mt-1" />
        <div className="flex flex-col overflow-hidden text-left">
          <span className="text-black text-sm font-extrabold">
            Lv.{product.level}
          </span>
          <span className="text-black text-base font-bold truncate leading-tight">
            {product.name}
          </span>
        </div>
      </div>

      <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          className="w-full h-full object-contain"
          alt={product.name}
        />
      </div>
    </div>
  );
};
