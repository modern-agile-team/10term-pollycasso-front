import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/user';
import { parseAccessToken } from '@/shared/lib';
import { authQueries } from '../queries/authQueries';

export const useLoginCallback = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const isRun = useRef(false);

  const { mutateAsync: refreshMutate } = useMutation(authQueries.refresh());

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const processLogin = async () => {
      try {
        const response = await refreshMutate();

        if (!('accessToken' in response)) {
          throw new Error('인증 정보가 올바르지 않습니다.');
        }

        const { accessToken } = response;
        const { sub: id, nickname, tag } = parseAccessToken(accessToken);

        setAuth({
          user: { id, nickname, tag },
          accessToken: accessToken,
        });

        navigate('/welcome', { replace: true });
      } catch (error) {
        console.error('Callback Login Error:', error);
        alert('로그인 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.');
        navigate('/login', { replace: true });
      }
    };

    processLogin();
  }, [navigate, setAuth, refreshMutate]);
};
