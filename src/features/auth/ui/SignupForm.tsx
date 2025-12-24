import { FormProvider } from 'react-hook-form';

import { cn } from '@/shared/lib';
import { Spinner } from '@/shared/ui/Spinner';
import { useSignup } from '../model/useSignup';
import { AuthInput } from './AuthInput';
import { PasswordVisibilityToggle } from './PasswordVisibilityToggle';

export const SignupForm = () => {
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
  } = useSignup();

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
          className={cn(
            'relative text-white rounded-xl p-4 mb-8 w-[450px] h-[80px] transition-colors duration-200 text-2xl',
            {
              'bg-[#003D00] hover:bg-green-600': isValid && !isSigningUp,
              'bg-[#7A917A]': !isValid || isSigningUp,
            },
          )}
        >
          <span className={isSigningUp ? 'opacity-0' : 'opacity-100'}>
            회원가입
          </span>
          {isSigningUp && (
            <Spinner overlay={true} transparent={true} size="sm" />
          )}
        </button>
      </form>
    </FormProvider>
  );
};
