import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/features/auth/lib';
import type { SignUpFormValues } from '@/features/auth/lib';

export const useSignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    watch,
    formState: { isValid },
  } = methods;

  const passwordValue = watch('password');

  const onSubmit = (data: SignUpFormValues) => {
    navigate('/welcome');
  };

  return {
    methods,
    handleSubmit,
    isValid,
    passwordValue,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    onSubmit,
  };
};
