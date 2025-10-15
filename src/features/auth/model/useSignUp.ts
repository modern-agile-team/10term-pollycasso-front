import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/features/auth/lib';
import type { SignUpFormValues } from '@/features/auth/lib';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { parseAccessToken } from '@/shared/lib/jwt';
import { useMutation } from '@tanstack/react-query';
import { authQueries } from '@/features/auth/queries/authQueries';
import { AxiosError } from 'axios';
import type { SignupFailureResponse } from '@/features/auth';

export const useSignUp = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const { mutate: signup, isPending: isSigningUp } = useMutation({
    ...authQueries.signup(),

    onSuccess: async (_, form) => {
      try {
        const loginResult = await authQueries.login().mutationFn({
          username: form.username,
          password: form.password,
        });

        if (!('accessToken' in loginResult)) {
          setErrorMessage('로그인에 실패했습니다.');
          return;
        }

        const decoded = parseAccessToken(loginResult.accessToken);

        setAuth({
          user: {
            id: decoded.sub,
            nickname: decoded.nickname,
          },
          accessToken: loginResult.accessToken,
          refreshToken: loginResult.refreshToken,
        });

        setErrorMessage(null);
        navigate('/welcome');
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          console.error('자동 로그인 실패:', err.response?.data?.message);
        }
        alert('회원가입에 성공했어요! 로그인 페이지로 이동합니다.');
        navigate('/login');
      }
    },

    onError: (err: AxiosError<SignupFailureResponse>) => {
      if (
        err.response?.status === 409 &&
        Array.isArray(err.response?.data?.errors)
      ) {
        err.response.data.errors.forEach(
          (e: { field: string; reason: string }) => {
            methods.setError(e.field as keyof typeof methods.formState.errors, {
              type: 'manual',
              message: e.reason,
            });
          },
        );
        return;
      }

      setErrorMessage(
        err.response?.data?.message ?? '회원가입에 실패했습니다.',
      );
    },
  });

  const onSubmit = (form: {
    username: string;
    nickname: string;
    password: string;
  }) => {
    signup(form);
  };

  return {
    methods,
    handleSubmit,
    isValid,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isSigningUp,
    errorMessage,
    onSubmit,
  };
};
