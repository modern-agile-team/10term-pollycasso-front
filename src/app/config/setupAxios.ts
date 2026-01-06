import type { AxiosError } from 'axios';

import { useAuthStore } from '@/entities/user';
import { postRefreshToken } from '@/features/auth';
import { instance } from '@/shared/api';
import { parseAccessToken } from '@/shared/lib';

export const setupAxiosInterceptors = () => {
  instance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    const isAuthPath =
      config.url?.includes('auth/login') || config.url?.includes('auth/signup');
    const cleanToken = token ? token.replace(/"/g, '') : null;

    if (cleanToken && !isAuthPath) {
      config.headers.Authorization = `Bearer ${cleanToken}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequest = error.config as any; // 타입 편의상 any 사용 혹은 확장 타입 사용
      const isAuthPath =
        originalRequest.url?.includes('auth/login') ||
        originalRequest.url?.includes('auth/signup');

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isAuthPath
      ) {
        originalRequest._retry = true;

        try {
          const res = await postRefreshToken();
          if (!res.success) throw new Error('토큰 갱신 실패');

          const newAccessToken = res.data.content;
          const decoded = parseAccessToken(newAccessToken);

          useAuthStore.getState().setAuth({
            user: { id: decoded.sub, nickname: decoded.nickname },
            accessToken: newAccessToken,
          });

          const cleanNewToken = newAccessToken.replace(/"/g, '');
          originalRequest.headers.Authorization = `Bearer ${cleanNewToken}`;

          return instance(originalRequest);
        } catch (err) {
          useAuthStore.getState().clearAuth();
          window.location.href = '/login';
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    },
  );
};
