import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface ValidationIconProps {
  isTouched: boolean;
  isError: boolean;
}

export const ValidationIcon = ({ isTouched, isError }: ValidationIconProps) => {
  if (!isTouched) {
    return <CheckCircleIcon className="w-9 h-9 stroke-1 text-gray-400" />;
  }
  if (!isError) {
    return <CheckCircleIcon className="w-9 h-9 stroke-1 text-green-500" />;
  }
  return <XCircleIcon className="w-9 h-9 stroke-1 text-red-500" />;
};
