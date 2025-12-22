import { useEffect, useState } from 'react';

export const useGameTimer = (endsAt: number | null) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!endsAt) {
      setTimeLeft(0);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.ceil((endsAt - now) / 1000));
      setTimeLeft(diff);
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [endsAt]);

  return timeLeft;
};
