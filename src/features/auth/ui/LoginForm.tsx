import { FormProvider } from 'react-hook-form';
import { AuthInput, PasswordVisibilityToggle } from '@/features/auth/ui';
import { useLogin } from '@/features/auth/model';
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
    onSubmit,
  } = useLogin();

  return (
    <div className="w-[470px] flex flex-col items-center">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-2">
          <AuthInput
            name="username"
            label="아이디"
            showValidationIcon
            onFocus={() => setIsAnyFieldFocused(true)}
            onBlur={() => setIsAnyFieldFocused(false)}
          />

          <AuthInput
            name="password"
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            showValidationIcon
            onFocus={() => setIsAnyFieldFocused(true)}
            onBlur={() => setIsAnyFieldFocused(false)}
            rightAddon={
              <PasswordVisibilityToggle
                isShown={showPassword}
                onToggle={() => setShowPassword((prev) => !prev)}
              />
            }
          />

          <button
            type="submit"
            className="text-white rounded-xl p-4 my-4 w-full transition-colors duration-200 text-2xl bg-[#003D00] hover:bg-green-600"
          >
            로그인
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
