import { StarIcon } from '@heroicons/react/24/solid';

import { GoldMedal } from '@/assets';
import type { TeamScore } from '@/shared/model';

import { BACKGROUND_FIREWORKS, FOREGROUND_FIREWORKS } from '../model/fireworks';
import type { FinishedPlayer } from '../model/types';
import { useTeamGameResult } from '../model/useTeamGameResult';
import { FireworksLayer } from './FireworksLayer';
import { RankRow } from './RankRow';
import { TeamPodiumSpot } from './TeamPodiumSpot';

interface TeamGameResultProps {
  results: FinishedPlayer[];
  teamScore: TeamScore | null;
}

export const TeamGameResult = ({ results, teamScore }: TeamGameResultProps) => {
  const { podiumMembers, listMembers, winningScore, PodiumSrc, resultText } =
    useTeamGameResult(results, teamScore);

  const firstPlace = podiumMembers[0];
  const secondPlace = podiumMembers[1];
  const thirdPlace = podiumMembers[2];

  return (
    <div className="relative w-[1000px] mt-20">
      <FireworksLayer items={BACKGROUND_FIREWORKS} />
      <img
        src={PodiumSrc}
        alt="Game Finished Podium"
        className="w-full object-contain drop-shadow-2xl"
      />

      <span className="absolute top-7 left-1/2 -translate-x-1/2 text-3xl text-white font-ssrm font-bold drop-shadow-lg">
        {resultText}
      </span>

      <div className="absolute -top-[410px] left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2">
          <StarIcon className="w-6 h-6 text-[#E1D1AE]" />
          <span className="font-ssrm font-black text-xl text-[#E1D1AE] pt-1">
            {(winningScore / 100).toFixed(1)}
          </span>
        </div>
      </div>

      <img
        src={GoldMedal}
        alt="Gold Medal"
        className="absolute -top-[370px] left-1/2 -translate-x-1/2 w-28 h-28 object-contain drop-shadow-lg z-50"
      />

      {firstPlace && (
        <TeamPodiumSpot
          rank={1}
          nickname={firstPlace.nickname}
          coins={firstPlace.coinsGained}
          xp={firstPlace.expGained}
          teamId={firstPlace.teamId}
        />
      )}

      {secondPlace && (
        <TeamPodiumSpot
          rank={2}
          nickname={secondPlace.nickname}
          coins={secondPlace.coinsGained}
          xp={secondPlace.expGained}
          teamId={secondPlace.teamId}
        />
      )}

      {thirdPlace && (
        <TeamPodiumSpot
          rank={3}
          nickname={thirdPlace.nickname}
          coins={thirdPlace.coinsGained}
          xp={thirdPlace.expGained}
          teamId={thirdPlace.teamId}
        />
      )}

      {listMembers.map((member, index) => {
        const topPosition = 140 + index * 150;

        return (
          <RankRow
            key={member.userId}
            rank={member.rank}
            rankText="LOSE"
            nickname={member.nickname}
            coins={member.coinsGained}
            xp={member.expGained}
            score={member.totalScore}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${topPosition}%` }}
            teamId={member.teamId}
          />
        );
      })}

      <FireworksLayer items={FOREGROUND_FIREWORKS} />
    </div>
  );
};
