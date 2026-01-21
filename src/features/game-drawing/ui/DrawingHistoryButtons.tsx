import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from '@heroicons/react/24/solid';

interface DrawingHistoryButtonsProps {
  undo: () => void;
  redo: () => void;
}

export const DrawingHistoryButtons = ({
  undo,
  redo,
}: DrawingHistoryButtonsProps) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={undo}
        className="group relative p-3 bg-[#E5E5E5] hover:bg-gray-300 active:bg-gray-400 rounded-full transition-all text-gray-700 disabled:opacity-30 flex items-center justify-center shadow-sm"
      >
        <ArrowUturnLeftIcon className="w-5 h-5 stroke-[2.5]" />
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
          실행 취소 (Ctrl + Z)
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </span>
      </button>

      <button
        onClick={redo}
        className="group relative p-3 bg-[#E5E5E5] hover:bg-gray-300 active:bg-gray-400 rounded-full transition-all text-gray-700 disabled:opacity-30 flex items-center justify-center shadow-sm"
      >
        <ArrowUturnRightIcon className="w-5 h-5 stroke-[2.5]" />
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
          다시 실행 (Ctrl + Shift + Z)
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </span>
      </button>
    </div>
  );
};
