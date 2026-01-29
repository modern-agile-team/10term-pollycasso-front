import { useNavigate } from 'react-router';
import { CircleStackIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';

interface SideBarProps {
  nickname: string;
  level: number;
  currentXp: number;
  coin: number;
  onLogout: () => void;
}

// TODO: 레벨별 컬러 및 경험치 등 유틸함수와 상수 정리 필요
const getMaxXp = (level: number): number => {
  if (level <= 10) return 50;
  if (level <= 20) return 60;
  if (level <= 30) return 70;
  return 100;
};

export const SideBar = ({
  nickname,
  level,
  currentXp,
  onLogout,
  coin,
}: SideBarProps) => {
  const maxXp = getMaxXp(level);
  const progress = (currentXp / maxXp) * 100;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-8 py-10 items-center w-[380px] h-[760px] rounded-3xl bg-[#1E3411]/40 text-white">
      <div className="flex self-start items-center gap-x-1 text-yellow-300">
        <CircleStackIcon className="w-7 h-7" />
        <span className="text-2xl">{coin.toLocaleString()}</span>
      </div>

      <div className="w-[225px] h-[225px] rounded-full shadow-lg border-2 border-white bg-white/30" />

      <div className="flex flex-col w-full mt-6">
        <div className="flex items-end justify-between">
          <div className="flex items-center mb-1">
            <div className="w-[35px] h-[35px] ml-2 rounded-full bg-gray-400 border border-white flex items-center justify-center">
              <span className="text-white text-2xl">{level}</span>
            </div>
            <span className="ml-2 text-3xl text-white">{nickname}</span>
            <button>
              <Cog8ToothIcon className="w-8 h-8 text-white ml-1 cursor-pointer" />
            </button>
          </div>
          <span className="text-xs">
            {currentXp}/{maxXp}
          </span>
        </div>
        <div className="mt-1 w-full">
          <div className="w-full h-5 rounded-full border border-white/80 p-[2px] overflow-hidden">
            <div
              className="h-full bg-[#3AE7A2] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full mt-4 gap-3 text-3xl">
        <button className="w-full h-[72px] rounded-full bg-[#6EE035]">
          마이페이지
        </button>
        <button
          className="w-full h-[72px] rounded-full bg-[#5697FF]"
          onClick={() => navigate('/shop')}
        >
          상점
        </button>

        <div className="flex justify-between gap-3">
          <button className="flex-1 h-[72px] rounded-full bg-[#FF5353]">
            랭킹
          </button>
          <button
            className="flex-1 h-[72px] rounded-full bg-[#FFBD2F]"
            onClick={() => navigate('/friend')}
          >
            친구
          </button>
        </div>

        <button
          onClick={onLogout}
          className="w-full h-[72px] rounded-full bg-black"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};
