import googleIcon from '@/assets/google.svg';
import { Button } from '@/shared/ui/Button';

export const GoogleLoginButton = () => {
  const handleLogin = () => {
    const baseUrl = import.meta.env.VITE_SOCIAL_LOGIN_URL;
    const currentDomain = window.location.origin;
    const targetUrl = `${currentDomain}/auth/callback`;

    window.location.href = `${baseUrl}/auth/google?state=${encodeURIComponent(targetUrl)}`;
  };

  return (
    <Button
      variant="google"
      className="w-full justify-between hover:underline"
      onClick={handleLogin}
    >
      <img src={googleIcon} className="w-6" alt="구글" />
      <p className="text-lg">Google 로그인</p>
      <div className="w-6" />
    </Button>
  );
};
