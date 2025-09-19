import { Button } from '@/shared/ui/Button';
import kakaoIcon from '@/assets/kakao.svg'; // 아이콘 경로 확인 필요
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
      {/* 원래 레이아웃 구조를 children으로 전달 */}
      <img src={kakaoIcon} className="w-6" alt="카카오" />
      <p className="text-lg">카카오 로그인</p>
      <div className="w-6" /> {/* 중앙 정렬을 위한 스페이서 */}
    </Button>
  );
};
