import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

import { useAuthStore } from '@/entities/user';

const WelcomePage = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    const timer = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => navigate('/', { replace: true }), 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={leaving ? { opacity: 0, scale: 3 } : { opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
          scale: { type: 'spring', bounce: 0.4 },
        }}
        className="w-[250px] h-[250px] bg-white rounded-full shadow-md"
      />

      <div className="mt-10 text-center font-ssrm font-bold">
        <span className="text-4xl text-green-500">{user.nickname}</span>
        <span className="text-4xl">
          님<br />
        </span>
        <p className="mt-1 text-4xl">안녕하세요!</p>
      </div>
    </div>
  );
};

export default WelcomePage;
