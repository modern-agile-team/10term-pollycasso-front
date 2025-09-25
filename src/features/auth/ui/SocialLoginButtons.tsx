import { KakaoLoginButton } from './KakaoLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';

export const SocialLoginButtons = () => {
  return (
    <div className="w-[470px] flex flex-col gap-4">
      <KakaoLoginButton />
      <GoogleLoginButton />
    </div>
  );
};
