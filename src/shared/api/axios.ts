import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { postRefreshToken } from '@/features/auth';
import queryString from 'query-string';

interface APIRequest extends Omit<AxiosRequestConfig, 'data' | 'method'> {
  url: string;
  params?: Record<string, any>;
}

interface APIRequestWithData<D = any> extends APIRequest {
  data?: D;
}

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const paramsSerializer = (params: Record<string, any>) =>
  queryString.stringify(params, { skipEmptyString: true, skipNull: true });

const common: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  paramsSerializer,
};

const instance = axios.create(common);

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  const isAuthPath =
    config.url?.includes('auth/login') || config.url?.includes('auth/signup');

  const cleanToken = token ? token.replace(/"/g, '') : null;

  if (cleanToken && !isAuthPath)
    config.headers.Authorization = `Bearer ${cleanToken}`;

  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;

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

        if (!res.success) {
          console.error(res.data.message);
          return Promise.reject(new Error('토큰 갱신 실패'));
        }

        const newAccessToken = res.data.content;
        localStorage.setItem('accessToken', newAccessToken);

        if (!originalRequest.headers) originalRequest.headers = {};
        const cleanNewToken = newAccessToken.replace(/"/g, '');
        originalRequest.headers.Authorization = `Bearer ${cleanNewToken}`;

        return instance(originalRequest);
      } catch (err) {
        console.error('리프레시 실패');

        localStorage.clear();

        window.location.href = '/login';

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export { instance };
export type { APIRequest, APIRequestWithData };
