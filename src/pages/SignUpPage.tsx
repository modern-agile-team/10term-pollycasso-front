import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { MegaphoneIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import title from '@/assets/title.svg';
import kakao from '@/assets/kakao.svg';
import google from '@/assets/google.svg';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const goToWelcomePage = () => {
    navigate('/welcome');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-center items-center mb-4 w-[690px] h-[630px] rounded-lg bg-white/30">
        <img src={title} className="w-full max-w-[405px] mx-auto mb-4" />

        <div className="relative mb-3 w-[450px]">
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setFocusedField('username')}
            onBlur={() => setFocusedField(null)}
            className="w-full px-6 pt-[20px] pb-[16px] border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#419341] focus:border-transparent transition-all duration-200"
          />
          <label
            htmlFor="username"
            className={clsx(
              'absolute left-6 transition-all duration-200 pointer-events-none font-pretendard',
              {
                'text-xs text-black bg-transparent top-[6px]':
                  focusedField === 'username' || username,
                'text-lg text-black top-[16px]': !(
                  focusedField === 'username' || username
                ),
              },
            )}
          >
            아이디
          </label>
        </div>

        <div className="relative mb-3 w-[450px]">
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            className="w-full px-6 pt-[20px] pb-[16px] border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#419341] focus:border-transparent transition-all duration-200"
          />
          <label
            htmlFor="password"
            className={clsx(
              'absolute left-6 transition-all duration-200 pointer-events-none',
              {
                'text-xs text-black bg-transparent top-[6px]':
                  focusedField === 'password' || password,
                'text-lg text-black top-[16px]': !(
                  focusedField === 'password' || password
                ),
              },
            )}
          >
            비밀번호
          </label>
        </div>

        <button
          onClick={goToWelcomePage}
          className="bg-[#003D00] text-white rounded-xl p-4 mb-4 w-[450px] hover:bg-green-600 transition-colors duration-200 text-2xl "
        >
          로그인
        </button>

        <hr className="w-[450px] border border-[#419341]" />

        <div className="relative w-[450px] mt-4">
          {/* 토스트 (포커스 없을 때만 보임) */}
          <AnimatePresence>
            {!username && !password && !focusedField && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: -20,
                  scale: 0.8,
                  transition: {
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
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

          {/* 카카오 로그인 버튼 */}
          <button
            onClick={goToWelcomePage}
            className="flex justify-between bg-[#FEE500] rounded-md py-4 w-full transition-colors duration-200 hover:underline"
          >
            <img src={kakao} className="mx-4 w-6" />
            <p className="text-lg">카카오 로그인</p>
            <div className="mx-4 w-6" />
          </button>
        </div>

        <button
          onClick={goToWelcomePage}
          className="flex justify-between bg-white rounded-md py-4 mt-4 w-[450px] transition-colors duration-200 hover:underline"
        >
          <img src={google} className="mx-4 w-6" />
          <p className="text-lg">Google 로그인</p>
          <div className="mx-4 w-6" />
        </button>
        <div className="flex justify-center items-center mt-6">
          <p className="text-lg">계정이 없으신가요?</p>
          <Link
            to="/signup"
            className="ml-2 text-2xl font-semibold text-[#305946] hover:underline"
          >
            가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
