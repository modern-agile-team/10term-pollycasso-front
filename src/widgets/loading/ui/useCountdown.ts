import { useState, useEffect, useRef } from 'react';

const getRemainingSeconds = (endsAt: number) =>
  Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));

export const useCountdown = (
  duration: number,
  callback?: () => void,
  endsAt?: number | null,
) => {
  const [count, setCount] = useState(
    endsAt ? getRemainingSeconds(endsAt) : duration,
  );
  const callbackRef = useRef(callback);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

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
            callbackRef.current?.();
          }
        }
        return;
      }

      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!hasFinishedRef.current) {
            hasFinishedRef.current = true;
            callbackRef.current?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, endsAt]);

  return count;
};
