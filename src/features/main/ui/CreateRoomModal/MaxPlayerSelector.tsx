import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface MaxPlayerSelectorProps {
  maxPlayers: number;
  isMin: boolean;
  isMax: boolean;
  increase: () => void;
  decrease: () => void;
}

export const MaxPlayerSelector = ({
  maxPlayers,
  isMin,
  isMax,
  increase,
  decrease,
}: MaxPlayerSelectorProps) => {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-[#FFBD2F] text-white font-bold rounded-t-xl px-6 py-3">
        게임인원
      </span>

      <div className="flex justify-center items-center mt-3 border-2 border-[#027DFF] bg-white rounded-xl font-bold text-[#027DFF] gap-2">
        <button
          type="button"
          disabled={isMin}
          onClick={decrease}
          className={`pr-2 py-[50px] ${
            isMin ? 'opacity-0 cursor-default' : ''
          }`}
        >
          <ChevronLeftIcon className="w-7 h-7 text-gray-500" />
        </button>

        <span className="text-2xl">{maxPlayers}인</span>

        <button
          type="button"
          disabled={isMax}
          onClick={increase}
          className={`pl-2 py-[50px] ${
            isMax ? 'opacity-0 cursor-default' : ''
          }`}
        >
          <ChevronRightIcon className="w-7 h-7 text-gray-500" />
        </button>
      </div>

      <div className="w-[130px] h-[10px] rounded-b-full bg-[#FFBD2F] mt-2" />
    </div>
  );
};
