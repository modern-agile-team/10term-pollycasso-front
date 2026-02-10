import { useNavigate } from 'react-router';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { useSound } from '@/entities/sound';
import { SoundManager } from '@/shared/api/sound/manager';
import { SOUND_ASSETS } from '@/shared/api/sound/assets';

export const BackButton = () => {
  const navigate = useNavigate();
  const { isMuted, sfxVolume } = useSound();

  const playClick = () => {
    if (!isMuted) {
      SoundManager.playSfx(SOUND_ASSETS.SFX.CLICK, sfxVolume);
    }
  };

  const handleNavigate = (path: number) => {
    playClick();
    navigate(path);
  };

  return (
    <div className="absolute top-4 left-4 z-10 flex items-center justify-center w-12 h-12 rounded-full hover:scale-105 bg-white/30 backdrop-blur-sm">
      <button
        onClick={() => handleNavigate(-1)}
        className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm transition-transform"
      >
        <ArrowUturnLeftIcon className="w-5 h-5 text-green-800 stroke-[2.5]" />
      </button>
    </div>
  );
};
