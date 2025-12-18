export interface ItemIconProps {
  id: string;
  name: string;
  count: number;
  isOwned: boolean;
  className?: string;
  onClick?: () => void;
}

export const ItemIcon = ({
  name,
  count,
  isOwned,
  className,
  onClick,
}: ItemIconProps) => {
  return (
    <div
      className={`flex flex-col items-center animate-fadeIn transition-all ${
        isOwned ? 'opacity-100' : 'opacity-40 grayscale'
      } ${className}`}
      onClick={onClick}
    >
      <div
        className={`relative w-[70px] h-[70px] rounded-full mx-auto shadow-md flex items-center justify-center font-bold text-sm select-none transition-transform duration-200
        ${
          isOwned
            ? 'bg-white text-gray-700 hover:scale-105 cursor-pointer hover:shadow-lg'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-inner'
        }`}
      >
        {name}

        {isOwned && (
          <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full border border-white shadow-sm z-10">
            x{count}
          </span>
        )}
      </div>
    </div>
  );
};
