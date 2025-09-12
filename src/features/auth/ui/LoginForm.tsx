import { useForm } from 'react-hook-form';
import { postLogin } from '@/features/auth/';
import Button from '@/shared/ui/Button';
import type { LoginCredentials } from '@/features/auth/';

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginCredentials>();

  const onSubmit = (data: LoginCredentials) => {
    postLogin(data)
      .then((res: any) => {
        console.log('로그인 성공:', res);
        // 토큰 저장, 사용자 상태 업그레이드 부분임
      })
      .catch((err: any) => {
        console.error('로그인 실패:', err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type="email" placeholder="이메일" />
      <input {...register('password')} type="password" placeholder="비밀번호" />
      <Button type="submit">로그인</Button>
    </form>
  );
};
