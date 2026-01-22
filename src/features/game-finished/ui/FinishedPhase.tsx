import { createPortal } from 'react-dom';
import { SoloPodium } from '@/assets';
import { RankRow } from '@/features/game-finished/ui/RankRow';
import { PodiumSpot } from '@/features/game-finished/ui/PodiumSpot';

import { MOCK_PLAYERS, MOCK_FINISH_CONTEXT } from '@/mocks/finished.mock';
import { useGameFinished } from '../model/useGameFinished';
import { useLockBodyScroll } from '@/shared/model/useLockBodyScroll';

export const FinishedPhase = () => {
  const results = useGameFinished(MOCK_PLAYERS, MOCK_FINISH_CONTEXT);

  const podiumMembers = results.filter((r) => r.rank <= 3);
  const listMembers = results.filter((r) => r.rank > 3);

  const getPodiumMember = (rank: number) =>
    podiumMembers.find((r) => r.rank === rank);

  const firstPlace = getPodiumMember(1);
  const secondPlace = getPodiumMember(2);
  const thirdPlace = getPodiumMember(3);

  useLockBodyScroll();

  return createPortal(
    <div className="fixed inset-0 z-[9999] w-screen h-screen bg-black/80 flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500 pb-24 overflow-y-auto">
      <div className="relative w-[1000px]">
        <img
          src={SoloPodium}
          alt="Game Finished Podium"
          className="w-full object-contain drop-shadow-2xl"
        />

        {firstPlace && (
          <PodiumSpot
            rank={1}
            nickname={firstPlace.nickname}
            coins={firstPlace.coinsGained}
            xp={firstPlace.expGained}
            score={firstPlace.totalScore}
            level={firstPlace.level}
          />
        )}

        {secondPlace && (
          <PodiumSpot
            rank={2}
            nickname={secondPlace.nickname}
            coins={secondPlace.coinsGained}
            xp={secondPlace.expGained}
            score={secondPlace.totalScore}
            level={secondPlace.level}
          />
        )}

        {thirdPlace && (
          <PodiumSpot
            rank={3}
            nickname={thirdPlace.nickname}
            coins={thirdPlace.coinsGained}
            xp={thirdPlace.expGained}
            score={thirdPlace.totalScore}
            level={thirdPlace.level}
          />
        )}

        {listMembers.map((member, index) => {
          const topPosition = 120 + index * 80;

          return (
            <RankRow
              key={member.userId}
              rank={member.rank}
              nickname={member.nickname}
              coins={member.coinsGained}
              xp={member.expGained}
              score={member.totalScore}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: `${topPosition}%` }}
            />
          );
        })}
      </div>
    </div>,
    document.body,
  );
};
