import { mutationOptions } from '@tanstack/react-query';

import { postLogin } from '../api/postLogin';
import { postSignup } from '../api/postSignup';

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
