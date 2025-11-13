import { useParams, useNavigate } from 'react-router';

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const room = {
    title: '테스트 방입니다',
    mode: '개인전',
    current: 1,
    max: 4,
    status: '대기중',
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen font-ssrm">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[480px] text-center">
        <h1 className="text-3xl font-bold mb-6">방에 입장했습니다!</h1>

        <div className="text-2xl font-bold mb-2">
          #{roomId} {room.title}
        </div>
        <div className="text-xl mb-1">모드: {room.mode}</div>
        <div className="text-xl mb-1">
          인원: {room.current}/{room.max}
        </div>
        <div className="text-lg text-green-600 font-bold">{room.status}</div>

        <button
          onClick={() => navigate('/')}
          className="mt-8 bg-black text-white px-6 py-3 rounded-xl text-xl"
        >
          로비로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default RoomPage;
