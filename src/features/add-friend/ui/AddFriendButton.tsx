import { overlay } from 'overlay-kit';
import { AddFriendModal } from './AddFriendModal';
import { useSound } from '@/entities/sound';
import { SoundManager } from '@/shared/api/sound/manager';
import { SOUND_ASSETS } from '@/shared/api/sound/assets';

export const AddFriendButton = ({
  recommendedFriends,
}: {
  recommendedFriends: any[];
}) => {
  const { isMuted, sfxVolume } = useSound();

  const playClick = () => {
    if (!isMuted) {
      SoundManager.playSfx(SOUND_ASSETS.SFX.CLICK, sfxVolume);
    }
  };

  const handleOpen = () => {
    playClick();

    overlay.open(({ unmount }) => (
      <AddFriendModal
        onClose={unmount}
        initialRecommendedFriends={recommendedFriends}
      />
    ));
  };

  return (
    <div className="p-1.5 mr-4 rounded-[20px] bg-white/10 border border-white/10 ">
      <button
        onClick={handleOpen}
        className="px-6 py-1 rounded-[14px] bg-[#2ADB75] hover:bg-[#52c97a] text-white text-2xl font-bold shadow-[0_0_20px_rgba(99,230,141,0.3)] transition-all"
      >
        친구추가
      </button>
    </div>
  );
};
