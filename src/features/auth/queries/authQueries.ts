import { mutationOptions } from '@tanstack/react-query';

import { postLogin } from '../api/postLogin';
import { postRefreshToken } from '../api/postRefreshToken';
import { postSignup } from '../api/postSignup';
import { postLogout } from '../api/postLogout';

export const authQueries = {
  auth: () => ['auth'] as const,

  login: () =>
    mutationOptions({
      mutationKey: [...authQueries.auth(), 'login'] as const,
      mutationFn: postLogin,
    }),

  signup: () =>
    mutationOptions({
      mutationKey: [...authQueries.auth(), 'signup'] as const,
      mutationFn: postSignup,
    }),

  refresh: () =>
    mutationOptions({
      mutationKey: [...authQueries.auth(), 'refresh'] as const,
      mutationFn: postRefreshToken,
    }),

  logout: () =>
    mutationOptions({
      mutationKey: [...authQueries.auth(), 'logout'] as const,
      mutationFn: postLogout,
    }),
};
