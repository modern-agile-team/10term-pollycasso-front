import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      console.error('로컬 스토리지 읽기 실패');
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error('로컬 스토리지 저장 실패');
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
