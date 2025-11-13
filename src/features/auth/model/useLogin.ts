import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/features/auth/lib';
import type { LoginFormValues } from '@/features/auth/lib';
import { useAuthStore, type LoginFailureResponse } from '@/features/auth/model';
import { parseAccessToken } from '@/shared/lib/jwt';
import { useMutation } from '@tanstack/react-query';
import { authQueries } from '@/features/auth/queries/authQueries';
import type { AxiosError } from 'axios';

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
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

    onSuccess: (result) => {
      if (!('accessToken' in result)) {
        setErrorMessage(result.message ?? '로그인에 실패했습니다.');
        return;
      }

      localStorage.setItem('accessToken', result.accessToken);

      const decoded = parseAccessToken(result.accessToken);

      setAuth({
        user: {
          id: decoded.sub,
          nickname: decoded.nickname,
        },
        accessToken: result.accessToken,
      });

      setErrorMessage(null);
      navigate('/welcome');
    },
    onError: (err: AxiosError<LoginFailureResponse>) => {
      setErrorMessage(err.response?.data?.message ?? '로그인에 실패했습니다.');
    },
  });

  const onSubmit = (form: { username: string; password: string }) => {
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
