import title from '@/assets/title.svg';
import { AuthLayout } from '@/widgets/auth/ui/AuthLayout';
import { SignUpForm } from '@/features/auth/ui/SignUpForm';

const SignUpPage = () => {
  return (
    <AuthLayout>
      <img
        src={title}
        className="w-full max-w-[405px] mx-auto mt-20 mb-2"
        alt="폴리카소 로고"
      />
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
