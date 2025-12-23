import { FormProvider } from 'react-hook-form';

import { ErrorMessage, Spinner } from '@/shared/ui';
import { useLogin } from '../model/useLogin';
import { AuthInput } from './AuthInput';
import { PasswordVisibilityToggle } from './PasswordVisibilityToggle';
import { SocialGuide } from './SocialGuide';

export const LoginForm = () => {
  const {
    methods,
    handleSubmit,
    username,
    password,
    isAnyFieldFocused,
    setIsAnyFieldFocused,
    showPassword,
    setShowPassword,
    errorMessage,
    onSubmit,
    isPending,
  } = useLogin();

  return (
    <div className="w-[470px] flex flex-col items-center">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-2">
          <AuthInput
            name="username"
            label="아이디"
            onFocus={() => setIsAnyFieldFocused(true)}
            onBlur={() => setIsAnyFieldFocused(false)}
          />

          <AuthInput
            name="password"
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            onFocus={() => setIsAnyFieldFocused(true)}
            onBlur={() => setIsAnyFieldFocused(false)}
            rightAddon={
              <PasswordVisibilityToggle
                isShown={showPassword}
                onToggle={() => setShowPassword((prev) => !prev)}
              />
            }
          />

          {errorMessage && <ErrorMessage message={errorMessage} />}
          <button
            type="submit"
            disabled={isPending}
            className="relative text-white rounded-xl p-4 my-4 w-full transition-colors duration-200 text-2xl bg-[#003D00] hover:bg-green-600"
          >
            <span className={isPending ? 'opacity-0' : 'opacity-100'}>
              로그인
            </span>
            {isPending && (
              <Spinner overlay={true} transparent={true} size="sm" />
            )}
          </button>
        </form>
      </FormProvider>

      <hr className="w-full border border-[#419341]" />

      <div className="relative w-full h-10">
        <SocialGuide visible={!username && !password && !isAnyFieldFocused} />
      </div>
    </div>
  );
};
