import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useAuthStore } from '@/entities/user';
import { parseAccessToken } from '@/shared/lib';
import { AUTH_MESSAGES } from '../constants/messages';
import type { SignupFormValues } from '../lib/validators';
import { signUpSchema } from '../lib/validators';
import type { SignupFailureResponse } from '../model/types';
import { authQueries } from '../queries/authQueries';

export const useSignup = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm<SignupFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const password = methods.watch('password');
  const { touchedFields } = methods.formState;

  useEffect(() => {
    if (touchedFields.confirmPassword) {
      methods.trigger('confirmPassword');
    }
  }, [password, touchedFields.confirmPassword]);

  const { mutate: signup, isPending: isSigningUp } = useMutation({
    ...authQueries.signup(),

    onSuccess: async (_, form) => {
      try {
        const { mutationFn: loginRequest } = authQueries.login();

        const loginResult = await loginRequest!({
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
      if (err.response?.status === 409) {
        err.response.data.errors?.forEach(
          (e: { field: string; reason: string }) => {
            let clientMessage: string | undefined;

            if (e.field === 'username') {
              clientMessage = AUTH_MESSAGES.USERNAME_DUPLICATE;
            } else if (e.field === 'nickname') {
              clientMessage = AUTH_MESSAGES.NICKNAME_DUPLICATE;
            }

            if (clientMessage) {
              methods.setError(e.field as any, {
                type: 'manual',
                message: clientMessage,
              });
            }
          },
        );
        return;
      }

      setErrorMessage(AUTH_MESSAGES.SIGNUP_GENERAL_FAILURE);
    },
  });

  const onSubmit = (formValues: SignupFormValues) => {
    const { confirmPassword, ...payload } = formValues;
    signup(payload);
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
