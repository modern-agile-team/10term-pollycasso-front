import { NotFoundImage } from '@/assets';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 font-ssrm">
      <p className="text-4xl font-bold text-gray-800 animate-bounce transition-all">
        앗?! 정글에서 길을 잃은 것 같아!
      </p>
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        className="w-1/2 mt-32 mb-24"
      />
      <p className="text-2xl text-gray-600">
        요청하신 페이지를 일시적으로 사용할 수 없거나 주소가 잘못
        입력되었습니다.
      </p>
      <p className="text-2xl text-gray-600 mb-12">
        입력하신 경로가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </p>

      <Link
        to="/"
        className="px-10 py-3 bg-[#003D00] text-white text-xl font-semibold rounded-3xl hover:brightness-125 transition inline-block"
      >
        돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
