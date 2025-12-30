import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { useAuthStore } from '@/entities/user';
import { instance } from '@/shared/api/axios';
import { parseAccessToken } from '@/shared/lib';
import { Spinner } from '@/shared/ui/Spinner';

const LoginCallbackPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const isRun = useRef(false);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const loginProcess = async () => {
      try {
        const response = await instance.post('/auth/refresh');

        const { accessToken } = response.data;

        if (!accessToken) throw new Error('토큰 없음');

        localStorage.setItem('accessToken', accessToken);

        const decoded = parseAccessToken(accessToken);

        setAuth({
          user: {
            id: decoded.sub || decoded.id,
            nickname: decoded.nickname,
          },
          accessToken: accessToken,
        });

        navigate('/welcome', { replace: true });
      } catch (error) {
        console.error('로그인 실패:', error);
        alert('소셜 로그인 처리에 실패했습니다.');
        navigate('/login', { replace: true });
      }
    };

    loginProcess();
  }, [navigate, setAuth]);

  return <Spinner fixed transparent size="xl" message="로그인 확인 중..." />;
};

export default LoginCallbackPage;
