import googleIcon from '@/assets/google.svg';
import { Button } from '@/shared/ui/Button';
import { navigateToSocialLogin } from '../lib/auth';

export const GoogleLoginButton = () => {
  return (
    <Button
      variant="google"
      className="w-full justify-between hover:underline"
      onClick={() => navigateToSocialLogin('google')}
    >
      <img src={googleIcon} className="w-6" alt="구글" />
      <p className="text-lg">Google 로그인</p>
      <div className="w-6" />
    </Button>
  );
};
