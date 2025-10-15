import { FormProvider } from 'react-hook-form';
import clsx from 'clsx';
import { PasswordVisibilityToggle } from './PasswordVisibilityToggle';
import { AuthInput } from '@/features/auth/ui';
import { useSignUp } from '@/features/auth/model';

export const SignUpForm = () => {
  const {
    methods,
    handleSubmit,
    isValid,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    onSubmit,
    isSigningUp,
    errorMessage,
  } = useSignUp();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[470px] flex flex-col items-center"
      >
        <AuthInput name="username" label="아이디" showValidationIcon />
        <AuthInput name="nickname" label="닉네임" showValidationIcon />

        <AuthInput
          name="password"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          showValidationIcon
          rightAddon={
            <PasswordVisibilityToggle
              isShown={showPassword}
              onToggle={() => setShowPassword((p) => !p)}
            />
          }
        />

        <AuthInput
          name="confirmPassword"
          label="비밀번호 확인"
          type={showConfirmPassword ? 'text' : 'password'}
          showValidationIcon
          rightAddon={
            <PasswordVisibilityToggle
              isShown={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((p) => !p)}
            />
          }
        />

        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

        <hr className="mt-7 mb-6 w-[450px] border border-[#419341]" />

        <button
          type="submit"
          disabled={!isValid || isSigningUp}
          className={clsx(
            'text-white rounded-xl p-4 mb-8 w-[450px] h-[80px] transition-colors duration-200 text-2xl',
            {
              'bg-[#003D00] hover:bg-green-600': isValid && !isSigningUp,
              'bg-[#7A917A] cursor-not-allowed': !isValid || isSigningUp,
            },
          )}
        >
          {isSigningUp ? '회원가입 중...' : '회원가입'}
        </button>
      </form>
    </FormProvider>
  );
};
