import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface ValidationIconProps {
  isTouched: boolean;
  isError: boolean;
}

export const ValidationIcon = ({ isTouched, isError }: ValidationIconProps) => {
  return (
    <>
      {!isTouched && (
        <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 stroke-1 text-gray-400" />
      )}
      {isTouched && !isError && (
        <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 stroke-1 text-green-500" />
      )}
      {isTouched && isError && (
        <XCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 stroke-1 text-red-500" />
      )}
    </>
  );
};
