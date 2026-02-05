import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';

/**
 * 특정 횟수만큼 연속 클릭 시 특정 페이지로 이동시키는 훅
 * @param threshold 클릭 횟수 (기본값 5)
 * @param timeout 초기화 시간 (기본값 2000ms)
 */
export const useAdminKnock = (
  threshold: number = 5,
  timeout: number = 2000,
) => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleKnock = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const nextCount = clickCount + 1;

    if (nextCount >= threshold) {
      setClickCount(0);
      navigate(import.meta.env.VITE_SECRET_PAGE);
      return;
    }

    setClickCount(nextCount);

    timerRef.current = setTimeout(() => {
      setClickCount(0);
    }, timeout);
  };

  return { handleKnock };
};
