import { motion } from 'framer-motion';

interface SpinnerProps {
  message?: string;
}

export const Spinner = ({ message }: SpinnerProps) => {
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full"
      />
      {message && <p className="mt-2 text-gray-500 text-sm">{message}</p>}
    </div>
  );
};

export default Spinner;
