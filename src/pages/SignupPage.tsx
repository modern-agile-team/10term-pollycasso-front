import title from '@/assets/title.svg';
import { SignupForm } from '@/features/auth';
import { AuthLayout } from '@/widgets/auth/ui/AuthLayout';

const SignupPage = () => {
  return (
    <AuthLayout>
      <img
        src={title}
        className="w-full max-w-[405px] mx-auto mt-20 mb-2"
        alt="폴리카소 로고"
      />
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;
