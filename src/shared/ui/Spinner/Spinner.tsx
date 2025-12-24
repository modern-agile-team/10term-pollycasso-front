import { motion } from 'framer-motion';

import { Spinner as SpinnerIcon } from '@/assets';
import { cn } from '@/shared/lib';
import type { SpinnerStyleProps } from './Spinner.utils';
import { getSpinnerStyles } from './Spinner.utils';

interface SpinnerProps extends SpinnerStyleProps {
  message?: string;
  className?: string;
}

export const Spinner = ({
  message,
  overlay = true,
  fixed = false,
  transparent = false,
  size = 'xl',
  className,
}: SpinnerProps) => {
  const { positionClass, bgClass, iconSizeClass } = getSpinnerStyles({
    fixed,
    overlay,
    transparent,
    size,
  });

  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center',
        positionClass,
        bgClass,
        className,
      )}
    >
      <motion.img
        src={SpinnerIcon}
        alt="Loading Spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className={cn('rounded-full object-contain', iconSizeClass)}
      />

      {message && (
        <p className="mt-4 font-ssrm font-bold text-lg animate-pulse text-gray-700">
          {message}
        </p>
      )}
    </div>
  );
};

export default Spinner;
