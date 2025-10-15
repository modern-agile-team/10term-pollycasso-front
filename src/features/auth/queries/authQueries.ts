import { postLogin } from '@/features/auth/api';
import { postSignup } from '@/features/auth/api';

export const authQueries = {
  auth: () => ['auth'] as const,

  login: () => ({
    mutationKey: [...authQueries.auth(), 'login'] as const,
    mutationFn: postLogin,
  }),

  signup: () => ({
    mutationKey: [...authQueries.auth(), 'signup'] as const,
    mutationFn: postSignup,
  }),
};
