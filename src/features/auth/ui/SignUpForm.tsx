import { FormProvider } from 'react-hook-form';
import clsx from 'clsx';
import { AuthInput } from '@/features/auth/ui/AuthInput';
import { PasswordVisibilityToggle } from './PasswordVisibilityToggle';
import { useSignUp } from '@/features/auth/model';

interface SignUpFormValues {
  username: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export const SignUpForm = () => {
  const {
    methods,
    handleSubmit,
    isValid,
    passwordValue,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    onSubmit,
    validateUsername,
    validateNickname,
    validatePassword,
  } = useSignUp();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[470px] flex flex-col items-center"
      >
        <AuthInput<SignUpFormValues>
          name="username"
          label="아이디"
          showValidationIcon
          validation={{ validate: validateUsername }}
        />

        <AuthInput<SignUpFormValues>
          name="nickname"
          label="닉네임"
          showValidationIcon
          validation={{ validate: validateNickname }}
        />

        <AuthInput<SignUpFormValues>
          name="password"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          showValidationIcon
          validation={{ validate: validatePassword }}
          rightAddon={
            <PasswordVisibilityToggle
              isShown={showPassword}
              onToggle={() => setShowPassword((p) => !p)}
            />
          }
        />

        <AuthInput<SignUpFormValues>
          name="confirmPassword"
          label="비밀번호 확인"
          type={showConfirmPassword ? 'text' : 'password'}
          showValidationIcon
          validation={{
            validate: (value) =>
              value === passwordValue || '비밀번호 확인이 일치하지 않습니다.',
          }}
          rightAddon={
            <PasswordVisibilityToggle
              isShown={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((p) => !p)}
            />
          }
        />

        <hr className="mt-7 mb-6 w-[450px] border border-[#419341]" />

        <button
          type="submit"
          disabled={!isValid}
          className={clsx(
            'text-white rounded-xl p-4 mb-8 w-[450px] h-[80px] transition-colors duration-200 text-2xl',
            {
              'bg-[#003D00] hover:bg-green-600': isValid,
              'bg-[#7A917A] cursor-not-allowed': !isValid,
            },
          )}
        >
          회원가입
        </button>
      </form>
    </FormProvider>
  );
};
