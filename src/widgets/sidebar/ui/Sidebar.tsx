import { useNavigate } from 'react-router';
import type { Outfit } from '@/shared/model';
import { getOutfitImageUrl, OUTFIT_LAYERS } from '@/shared/lib/cdn';
import { Coin } from '@/assets';
import { useSound } from '@/entities/sound';
import { SoundManager } from '@/shared/api/sound/manager';
import { SOUND_ASSETS } from '@/shared/api/sound/assets';

interface MenuItem {
  label: string;
  path: string;
  color: string;
  isHalf?: boolean;
}

const MENU_CONFIG: Record<'main' | 'mypage', MenuItem[]> = {
  main: [
    { label: '마이페이지', path: '/mypage', color: 'bg-[#6EE035]' },
    { label: '상점', path: '/shop', color: 'bg-[#5697FF]' },
    { label: '랭킹', path: '/ranking', color: 'bg-[#FF5353]', isHalf: true },
    { label: '친구', path: '/friend', color: 'bg-[#FFBD2F]', isHalf: true },
  ],
  mypage: [
    {
      label: '개인정보 수정',
      path: '/mypage?section=profile',
      color: 'bg-[#6EE035]',
    },
    {
      label: '환경설정',
      path: '/mypage?section=settings',
      color: 'bg-[#5697FF]',
    },
    { label: '상점', path: '/shop', color: 'bg-[#FF5353]', isHalf: true },
    { label: '옷장', path: '/wardrobe', color: 'bg-[#FFBD2F]', isHalf: true },
  ],
};

interface SideBarProps {
  nickname: string;
  level: number;
  currentXp: number;
  coin: number;
  outfit: Outfit;
  onLogout: () => void;
  currentPage?: 'main' | 'mypage';
}

const getMaxXp = (level: number): number => {
  if (level <= 10) return 50;
  if (level <= 20) return 60;
  if (level <= 30) return 70;
  return 100;
};

export const Sidebar = ({
  nickname,
  level,
  currentXp,
  coin,
  outfit,
  onLogout,
  currentPage = 'main',
}: SideBarProps) => {
  const maxXp = getMaxXp(level);
  const progress = (currentXp / maxXp) * 100;
  const navigate = useNavigate();
  const menuItems = MENU_CONFIG[currentPage];

  const { isMuted, sfxVolume } = useSound();

  const playClick = () => {
    if (!isMuted) {
      SoundManager.playSfx(SOUND_ASSETS.SFX.CLICK, sfxVolume);
    }
  };

  const handleNavigate = (path: string) => {
    playClick();
    navigate(path);
  };

  return (
    <div className="flex flex-col px-8 py-10 items-center w-[380px] h-[760px] rounded-3xl bg-[#1E3411]/40 text-white">
      <div className="flex self-start items-center gap-x-1 text-yellow-300">
        <img src={Coin} alt="coin" className="w-7 h-7" />
        <span className="ml-1 text-2xl">{coin.toLocaleString()}</span>
      </div>

      <div className="relative w-[225px] h-[250px] rounded-full shadow-lg border-2 border-white bg-black/20 overflow-hidden">
        {OUTFIT_LAYERS.map((layer) => {
          const partId = outfit[layer];
          if (!partId) return null;
          return (
            <img
              key={layer}
              src={getOutfitImageUrl(partId)}
              alt={layer}
              className="absolute object-cover scale-125 top-10"
              style={{ zIndex: OUTFIT_LAYERS.indexOf(layer) }}
            />
          );
        })}
      </div>

      <div className="flex flex-col w-full mt-6">
        <div className="flex items-end justify-between">
          <div className="flex items-center mb-1">
            <div className="w-[35px] h-[35px] ml-2 rounded-full bg-gray-400 border border-white flex items-center justify-center">
              <span className="text-white text-2xl">{level}</span>
            </div>
            <span className="ml-2 text-3xl text-white">{nickname}</span>
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
        {menuItems.map((item, index) => {
          if (item.isHalf) {
            if (index > 0 && menuItems[index - 1].isHalf) return null;
            const nextItem = menuItems[index + 1];
            return (
              <div key={item.label} className="flex justify-between gap-3">
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={`flex-1 h-[72px] rounded-full ${item.color} hover:brightness-110 transition-all`}
                >
                  {item.label}
                </button>
                {nextItem && (
                  <button
                    onClick={() => handleNavigate(nextItem.path)}
                    className={`flex-1 h-[72px] rounded-full ${nextItem.color} hover:brightness-110 transition-all`}
                  >
                    {nextItem.label}
                  </button>
                )}
              </div>
            );
          }
          return (
            <button
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              className={`w-full h-[72px] rounded-full ${item.color} hover:brightness-110 transition-all`}
            >
              {item.label}
            </button>
          );
        })}

        <button
          onClick={
            currentPage === 'main' ? onLogout : () => handleNavigate('/')
          }
          className="w-full h-[72px] rounded-full bg-black hover:bg-gray-900 transition-all"
        >
          {currentPage === 'main' ? '로그아웃' : '돌아가기'}
        </button>
      </div>
    </div>
  );
};
