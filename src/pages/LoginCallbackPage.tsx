import { useLoginCallback } from '@/features/auth';
import { Spinner } from '@/shared/ui/Spinner';

const LoginCallbackPage = () => {
  useLoginCallback();

  return <Spinner fixed transparent size="xl" message="로그인 확인 중..." />;
};

export default LoginCallbackPage;
