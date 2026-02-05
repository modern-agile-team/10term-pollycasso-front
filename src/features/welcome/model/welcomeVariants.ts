import type { Variants, TargetAndTransition } from 'framer-motion';

export const welcomeVariants: Record<'classic' | 'spiral' | 'prism', Variants> =
  {
    classic: {
      initial: { opacity: 0, scale: 0 },
      animate: (leaving: boolean): TargetAndTransition =>
        leaving
          ? {
              opacity: 0,
              scale: 3,
              transition: { duration: 0.5, ease: 'easeInOut' },
            }
          : {
              opacity: 1,
              scale: 1,
              transition: { type: 'spring', bounce: 0.4 },
            },
    },
    spiral: {
      initial: { opacity: 0, scale: 0, rotate: -180 },
      animate: (leaving: boolean): TargetAndTransition =>
        leaving
          ? {
              opacity: 0,
              scale: 4,
              rotate: 720,
              transition: { duration: 1, ease: 'easeOut' },
            }
          : {
              opacity: 1,
              scale: 1,
              rotate: 360,
              transition: { duration: 0.6, ease: 'easeIn' },
            },
    },
    prism: {
      initial: { opacity: 0, scale: 0, filter: 'hue-rotate(0deg)' },
      animate: (leaving: boolean): TargetAndTransition =>
        leaving
          ? { opacity: 0, scale: 3, transition: { duration: 0.5 } }
          : {
              opacity: 1,
              scale: [1, 1.08],
              transition: {
                opacity: { type: 'spring', bounce: 0.4 },
                scale: {
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 0.5,
                  ease: 'easeInOut',
                },
                filter: { repeat: Infinity, duration: 3, ease: 'linear' },
              },
            },
    },
  };
