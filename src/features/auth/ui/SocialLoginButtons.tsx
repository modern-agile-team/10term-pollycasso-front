import { GoogleLoginButton } from './GoogleLoginButton';
import { KakaoLoginButton } from './KakaoLoginButton';

export const SocialLoginButtons = () => {
  return (
    <div className="w-[470px] flex flex-col gap-4">
      <KakaoLoginButton />
      <GoogleLoginButton />
    </div>
  );
};
