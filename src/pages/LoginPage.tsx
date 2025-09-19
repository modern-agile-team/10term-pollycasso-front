import title from '@/assets/title.svg';
import { AuthLayout } from '@/widgets/auth/ui/AuthLayout';
import { LoginForm, SocialLoginButtons, SignUpLink } from '@/features/auth/ui';

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
      <SignUpLink />
    </AuthLayout>
  );
};

export default LoginPage;
