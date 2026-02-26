import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useAuthStore } from '@/entities/user';
import { parseAccessToken } from '@/shared/lib';
import type { LoginFormValues } from '../lib/validators';
import { loginSchema } from '../lib/validators';
import type { LoginFailureResponse } from '../model/types';
import { authQueries } from '../queries/authQueries';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const updateUser = useAuthStore((state) => state.updateUser);

  const [isAnyFieldFocused, setIsAnyFieldFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const { handleSubmit, watch } = methods;

  const username = watch('username');
  const password = watch('password');

  const { mutate: login, isPending } = useMutation({
    ...authQueries.login(),

    onSuccess: async (response) => {
      if (!('accessToken' in response)) {
        setErrorMessage(response.message ?? '로그인에 실패했습니다.');
        return;
      }

      const { accessToken } = response;
      const { sub: id, nickname, tag } = parseAccessToken(accessToken);

      setAuth({
        user: { id, nickname, tag },
        accessToken: accessToken,
      });

      try {
        const profileData = await queryClient.fetchQuery(authQueries.user());
        updateUser(profileData);
      } catch (err) {
        console.error('유저 프로필을 가져오는 데 실패했습니다:', err);
      }

      setErrorMessage(null);
      navigate('/welcome');
    },

    onError: (err: AxiosError<LoginFailureResponse>) => {
      setErrorMessage(err.response?.data?.message ?? '로그인에 실패했습니다.');
    },
  });

  const onSubmit = (form: LoginFormValues) => {
    login(form);
  };

  return {
    methods,
    handleSubmit,
    username,
    password,
    isAnyFieldFocused,
    setIsAnyFieldFocused,
    showPassword,
    setShowPassword,
    errorMessage,
    isPending,
    onSubmit,
  };
};
