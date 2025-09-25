import { Button } from '@/shared/ui';
import kakaoIcon from '@/assets/kakao.svg';
import { useNavigate } from 'react-router';

export const KakaoLoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/welcome');
  };

  return (
    <Button
      variant="kakao"
      className="w-full justify-between hover:underline"
      onClick={handleLogin}
    >
      <img src={kakaoIcon} className="w-6" alt="카카오" />
      <p className="text-lg">카카오 로그인</p>
      <div className="w-6" />
    </Button>
  );
};
