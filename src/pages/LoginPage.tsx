import { Link, useNavigate } from 'react-router';
import { useForm, FormProvider } from 'react-hook-form';
import { MegaphoneIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthInput } from '@/features/auth/ui/AuthInput';
import clsx from 'clsx';
import title from '@/assets/title.svg';
import kakao from '@/assets/kakao.svg';
import google from '@/assets/google.svg';

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginFormValues>({
    mode: 'onChange',
  });

  const {
    handleSubmit,
    watch,
    formState: { isValid },
  } = methods;

  const username = watch('username');
  const password = watch('password');

  const onSubmit = (data: LoginFormValues) => {
    console.log('로그인 데이터:', data);
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
            <AuthInput<LoginFormValues>
              name="username"
              label="아이디"
              validation={{
                required: '아이디를 입력해주세요',
              }}
            />

            <AuthInput<LoginFormValues>
              name="password"
              label="비밀번호"
              type="password"
              validation={{
                required: '비밀번호를 입력해주세요',
              }}
            />

            <button
              type="submit"
              disabled={!isValid}
              className={clsx(
                'text-white rounded-xl p-4 my-4 w-full transition-colors duration-200 text-2xl',
                isValid
                  ? 'bg-[#003D00] hover:bg-green-600'
                  : 'bg-[#7A9A7A] cursor-not-allowed',
              )}
            >
              로그인
            </button>
          </form>
        </FormProvider>

        <hr className="w-[470px] border border-[#419341]" />

        <div className="relative w-[470px] mt-4">
          <AnimatePresence>
            {!username && !password && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: -20,
                  scale: 0.8,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute -top-10 left-32 -translate-x-1/2 
                   bg-white rounded-full shadow-xl pl-7 pr-9 py-2 
                   flex items-center gap-2 text-md
                   after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2
                   after:border-8 after:border-transparent after:border-t-white"
              >
                <MegaphoneIcon className="w-5" />
                <p>3초만에 시작하기</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => navigate('/welcome')}
            className="flex justify-between bg-[#FEE500] rounded-md py-4 w-full transition-colors duration-200 hover:underline"
          >
            <img src={kakao} className="mx-4 w-6" />
            <p className="text-lg">카카오 로그인</p>
            <div className="mx-4 w-6" />
          </button>
        </div>

        <button
          onClick={() => navigate('/welcome')}
          className="flex justify-between bg-white rounded-md py-4 mt-4 w-[470px] transition-colors duration-200 hover:underline"
        >
          <img src={google} className="mx-4 w-6" />
          <p className="text-lg">Google 로그인</p>
          <div className="mx-4 w-6" />
        </button>

        <div className="flex justify-center items-center mt-6">
          <p className="text-lg">계정이 없으신가요?</p>
          <Link
            to="/signup"
            className="ml-2 text-2xl font-semibold text-[#329A6A] hover:underline"
          >
            가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
