import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface LoginFormValues {
  username: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const [isAnyFieldFocused, setIsAnyFieldFocused] = useState(false);

  const methods = useForm<LoginFormValues>({
    mode: 'onChange',
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
    onSubmit,
  };
};
