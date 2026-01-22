import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SoloPodium } from '@/assets';
import { RankRow } from '@/features/game-finished/ui/RankRow';
import { PodiumSpot } from '@/features/game-finished/ui/PodiumSpot';

export const FinishedPhase = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[9999] w-screen h-screen bg-black/80 flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500 pb-24">
      <div className="relative w-[1000px]">
        <img
          src={SoloPodium}
          alt="Game Finished Podium"
          className="w-full object-contain drop-shadow-2xl"
        />

        <PodiumSpot
          rank={1}
          nickname="폴리카소07"
          coins={20}
          xp={30}
          score={9.5}
        />

        <PodiumSpot rank={2} nickname="DFPOW" coins={20} xp={30} score={8.5} />

        <PodiumSpot rank={3} nickname="EGG" coins={20} xp={30} score={7.5} />

        <RankRow
          rank={4}
          nickname="DFJAS"
          coins={20}
          xp={30}
          score={6.5}
          className="absolute top-[120%] left-1/2 -translate-x-1/2"
        />

        <RankRow
          rank={5}
          nickname="모던애자일"
          coins={20}
          xp={30}
          score={6.0}
          className="absolute top-[200%] left-1/2 -translate-x-1/2"
        />

        <RankRow
          rank={6}
          nickname="EGG"
          coins={20}
          xp={30}
          score={3.5}
          className="absolute top-[280%] left-1/2 -translate-x-1/2"
        />
      </div>
    </div>,
    document.body,
  );
};
