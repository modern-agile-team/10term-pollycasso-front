import kakaoIcon from '@/assets/kakao.svg';
import { Button } from '@/shared/ui/Button';
import { navigateToSocialLogin } from '../lib/auth';

export const KakaoLoginButton = () => {
  return (
    <Button
      variant="kakao"
      className="w-full justify-between hover:underline"
      onClick={() => navigateToSocialLogin('kakao')}
    >
      <img src={kakaoIcon} className="w-6" alt="카카오" />
      <p className="text-lg">카카오 로그인</p>
      <div className="w-6" />
    </Button>
  );
};
