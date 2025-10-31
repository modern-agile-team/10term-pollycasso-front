import { mutationOptions } from '@tanstack/react-query';
import { postLogin, postSignup } from '@/features/auth/api';

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
};
