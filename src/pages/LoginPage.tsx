import title from '@/assets/title.svg';
import { LoginForm, SignupLink, SocialLoginButtons } from '@/features/auth';
import { AuthLayout } from '@/widgets/auth/ui/AuthLayout';

const LoginPage = () => {
  return (
    <AuthLayout>
      <img
        src={title}
        className="w-full max-w-[405px] mx-auto mt-20"
        alt="폴리카소 로고"
      />
      <LoginForm />
      <SocialLoginButtons />
      <SignupLink />
    </AuthLayout>
  );
};

export default LoginPage;
