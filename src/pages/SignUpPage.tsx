import { useNavigate } from 'react-router';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import clsx from 'clsx';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { AuthInput } from '@/features/auth/ui/AuthInput';
import title from '@/assets/title.svg';
import {
  validateUsername,
  validateNickname,
  validatePassword,
} from '@/features/auth/lib/validators';

interface SignUpFormValues {
  username: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const methods = useForm<SignUpFormValues>({
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
    console.log('회원가입 정보:', data);
    navigate('/welcome');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-start items-center w-[690px] min-h-[650px] rounded-lg bg-white/30">
        <img src={title} className="w-full max-w-[405px] mx-auto mt-10 mb-4" />

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
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <EyeIcon className="w-6 h-6 stroke-1 text-[#5A5A5A]" />
                  ) : (
                    <EyeSlashIcon className="w-6 h-6 stroke-1 text-[#5A5A5A]" />
                  )}
                </button>
              }
            />

            <AuthInput<SignUpFormValues>
              name="confirmPassword"
              label="비밀번호 확인"
              type={showConfirmPassword ? 'text' : 'password'}
              showValidationIcon
              validation={{
                validate: (value) =>
                  value === passwordValue ||
                  '비밀번호 확인이 일치하지 않습니다.',
              }}
              rightAddon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeIcon className="w-6 h-6 stroke-1 text-[#5A5A5A]" />
                  ) : (
                    <EyeSlashIcon className="w-6 h-6 stroke-1 text-[#5A5A5A]" />
                  )}
                </button>
              }
            />

            <hr className="my-7 w-[450px] border border-[#419341]" />

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
      </div>
    </div>
  );
};

export default SignUpPage;
