import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { Title } from '@/assets';

interface LoadingWidgetProps {
  duration?: number;
  endsAt?: number | null;
  onFinished?: () => void;
}

const COUNTDOWN_OFFSET_MS = 2000;

const getRemainingSeconds = (endsAt: number) =>
  Math.max(0, Math.ceil((endsAt - COUNTDOWN_OFFSET_MS - Date.now()) / 1000));

const getCountColor = (num: number) => {
  if (num >= 3) return '#00AD66';
  if (num === 2) return '#FF7452';
  return '#FF3434';
};

const popAnimation = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    duration: 0.4,
    ease: [0.175, 0.885, 0.32, 1.275] as const,
  },
};

export const LoadingWidget = ({
  duration = 5,
  endsAt,
  onFinished,
}: LoadingWidgetProps) => {
  const [count, setCount] = useState(
    endsAt ? getRemainingSeconds(endsAt) : duration,
  );
  const onFinishedRef = useRef(onFinished);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  useEffect(() => {
    hasFinishedRef.current = false;
    setCount(endsAt ? getRemainingSeconds(endsAt) : duration);
  }, [duration, endsAt]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (endsAt) {
        const remaining = getRemainingSeconds(endsAt);
        setCount(remaining);

        if (remaining <= 0) {
          clearInterval(interval);
          if (!hasFinishedRef.current) {
            hasFinishedRef.current = true;
            onFinishedRef.current?.();
          }
        }
        return;
      }

      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!hasFinishedRef.current) {
            hasFinishedRef.current = true;
            onFinishedRef.current?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, endsAt]);

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center">
      <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full bg-white shadow-md"></div>

      <div className="mt-10 flex flex-col items-center text-center font-ssrm font-bold">
        <div className="mt-1 grid h-20 w-full place-items-center">
          <motion.p
            className="col-start-1 row-start-1 text-5xl text-gray-800"
            animate={{ opacity: count > 0 ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            게임 시작까지
          </motion.p>

          {count === 0 && (
            <motion.img
              src={Title}
              alt="Pollycasso"
              className="col-start-1 row-start-1 mb-4 h-16 object-contain"
              {...popAnimation}
            />
          )}
        </div>

        <motion.p
          key={count}
          className="mt-5 origin-center text-6xl"
          style={{ color: getCountColor(count) }}
          {...popAnimation}
        >
          {count > 0 ? count : 'GO!!'}
        </motion.p>
      </div>
    </div>
  );
};
