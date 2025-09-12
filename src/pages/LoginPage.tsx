import { LoginForm } from '@/features/auth';
import clsx from 'clsx';

const LoginPage = () => {
  return (
    <div
      className={clsx(
        'flex',
        'justify-center',
        'items-center',
        'h-screen',
        'bg-gray-100',
      )}
    >
      <div className={clsx('bg-white', 'p-8', 'rounded', 'shadow-md')}>
        <h1 className={clsx('text-2xl', 'font-bold', 'mb-4')}>로그인</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
