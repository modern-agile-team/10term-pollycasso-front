import { useState, useEffect, useRef } from 'react';

export const useCountdown = (duration: number, callback?: () => void) => {
  const [count, setCount] = useState(duration);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (callbackRef.current) callbackRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return count;
};
