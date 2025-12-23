import { Link } from 'react-router';

export const SignupLink = () => {
  return (
    <div className="flex justify-center items-center mt-6">
      <p className="text-lg">계정이 없으신가요?</p>
      <Link
        to="/signup"
        className="ml-2 text-2xl font-semibold text-[#329A6A] hover:underline"
      >
        가입하기
      </Link>
    </div>
  );
};
