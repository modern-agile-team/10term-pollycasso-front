import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/features/auth/lib';
import type { LoginFormValues } from '@/features/auth/lib';

export const useLogin = () => {
  const navigate = useNavigate();
  const [isAnyFieldFocused, setIsAnyFieldFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const { handleSubmit, watch } = methods;

  const username = watch('username');
  const password = watch('password');

  const onSubmit = (data: LoginFormValues) => {
    navigate('/welcome');
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
    onSubmit,
  };
};
