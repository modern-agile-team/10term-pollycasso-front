import { motion } from 'framer-motion';
import clsx from 'clsx';

interface SpinnerProps {
  message?: string;
}

export const Spinner = ({ message }: SpinnerProps) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'py-10',
      )}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className={clsx(
          'w-8',
          'h-8',
          'border-4',
          'border-t-transparent',
          'border-blue-500',
          'rounded-full',
        )}
      />
      {message && (
        <p className={clsx('mt-2', 'text-gray-500', 'text-sm')}>{message}</p>
      )}
    </div>
  );
};

export default Spinner;
