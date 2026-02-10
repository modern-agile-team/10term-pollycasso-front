import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { useSoundStore } from '@/entities/sound';
import type { MouseEvent } from 'react';
import { SoundManager } from '@/shared/api/sound/manager';
import { SOUND_ASSETS } from '@/shared/api/sound/assets';

export const SoundButton = () => {
  const { isMuted, toggleMute, bgmVolume } = useSoundStore();

  const handleToggle = (event: MouseEvent) => {
    event.stopPropagation();

    SoundManager.resume();

    if (isMuted) {
      SoundManager.playBgm(SOUND_ASSETS.BGM.LOBBY, bgmVolume);
    }

    toggleMute();
  };

  return (
    <div className="fixed top-4 right-4 z-[100] flex items-center justify-center w-12 h-12 rounded-full hover:scale-105 bg-white/30 backdrop-blur-sm transition-transform">
      <button
        onClick={handleToggle}
        title={isMuted ? '소리 켜기' : '소리 끄기'}
        className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm transition-transform active:scale-95"
      >
        {isMuted ? (
          <SpeakerXMarkIcon className="w-5 h-5 text-green-800 stroke-[2.5]" />
        ) : (
          <SpeakerWaveIcon className="w-5 h-5 text-green-800 stroke-[2.5]" />
        )}
      </button>
    </div>
  );
};
