import { motion } from 'framer-motion';

import type { LeafData } from '@/shared/lib';

export const Leaf = ({
  src,
  x,
  rotation,
  duration,
  delay,
  size,
  screenHeight,
  shifts,
}: LeafData) => {
  return (
    <motion.img
      src={src}
      className="absolute pointer-events-none will-change-transform"
      style={{ width: size, height: size, top: -100, left: x }}
      initial={{ opacity: 0 }}
      animate={{
        y: [-100, screenHeight + 200],
        x: shifts,
        rotate: [
          rotation,
          rotation + 45,
          rotation - 30,
          rotation + 60,
          rotation,
        ],
        opacity: [0, 1, 0.9, 1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
};
