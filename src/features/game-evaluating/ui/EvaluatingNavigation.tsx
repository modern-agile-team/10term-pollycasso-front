import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface EvaluatingNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

export const EvaluatingNavigation = ({
  onPrev,
  onNext,
}: EvaluatingNavigationProps) => {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full transition-colors"
      >
        <ChevronLeftIcon className="w-16 h-16 text-gray-300 hover:text-gray-400 transform scale-y-[2.5] scale-x-[1.75]" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full transition-colors"
      >
        <ChevronRightIcon className="w-16 h-16 text-gray-300 hover:text-gray-400 transform scale-y-[2.5] scale-x-[1.75]" />
      </button>
    </>
  );
};
