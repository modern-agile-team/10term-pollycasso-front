import title from '@/assets/title.svg';
import { LoginForm, SignupLink, SocialLoginButtons } from '@/features/auth';
import { AuthLayout } from '@/widgets/auth/ui/AuthLayout';
import { useAdminKnock } from '@/features/admin';

const LoginPage = () => {
  const { handleKnock } = useAdminKnock();

  return (
    <div className="relative">
      <div
        onClick={handleKnock}
        className="absolute bg-black/10 top-0 right-0 w-[50px] h-[50px] z-[999] cursor-default"
      />

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
    </div>
  );
};

export default LoginPage;
