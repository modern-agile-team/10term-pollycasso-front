import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import type { User } from '@/entities/user';

export const useWelcomeLogic = (user: User | null) => {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  const animType = useMemo(() => {
    const types = ['classic', 'spiral', 'prism'] as const;
    return types[Math.floor(Math.random() * 3)];
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => navigate('/', { replace: true }), 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return { leaving, animType };
};
