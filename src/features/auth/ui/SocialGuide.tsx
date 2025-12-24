import { MegaphoneIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

interface SocialGuideProps {
  visible: boolean;
}

export const SocialGuide = ({ visible }: SocialGuideProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.8,
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute -top-1 left-[135px] -translate-x-1/2 bg-white rounded-full shadow-xl pl-7 pr-9 py-2 flex items-center gap-2 text-md after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-white"
        >
          <MegaphoneIcon className="w-5" />
          <p>3초만에 시작하기</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
