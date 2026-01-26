import { useMemo } from 'react';

import { BluePodium, RedPodium, SoloPodium } from '@/assets';
import type { TeamScore } from '@/shared/model';

import type { FinishedPlayer } from '../model/types';

export const useTeamGameResult = (
  results: FinishedPlayer[],
  teamScore: TeamScore | null,
) => {
  const winningTeamId = useMemo(() => {
    if (!teamScore) return null;
    if (teamScore.red > teamScore.blue) return 'RED';
    if (teamScore.blue > teamScore.red) return 'BLUE';
    return 'DRAW';
  }, [teamScore]);

  const { podiumMembers, listMembers } = useMemo(() => {
    if (!winningTeamId || winningTeamId === 'DRAW') {
      return {
        podiumMembers: results.filter((r) => r.rank <= 3),
        listMembers: results.filter((r) => r.rank > 3),
      };
    }

    const winners = results
      .filter((r) => r.teamId === winningTeamId)
      .sort((a, b) => b.totalScore - a.totalScore);

    const losers = results.filter((r) => r.teamId !== winningTeamId);

    return { podiumMembers: winners, listMembers: losers };
  }, [results, winningTeamId]);

  const winningScore = useMemo(() => {
    if (!teamScore || !winningTeamId || winningTeamId === 'DRAW') return 0;

    return results
      .filter((member) => member.teamId === winningTeamId)
      .reduce((sum, member) => sum + member.totalScore, 0);
  }, [results, teamScore, winningTeamId]);

  const PodiumSrc = useMemo(() => {
    if (!teamScore) return SoloPodium;
    if (teamScore.red > teamScore.blue) return RedPodium;
    if (teamScore.blue > teamScore.red) return BluePodium;
    return SoloPodium;
  }, [teamScore]);

  const resultText = useMemo(() => {
    if (winningTeamId === 'RED') return 'RED TEAM WIN';
    if (winningTeamId === 'BLUE') return 'BLUE TEAM WIN';
    return 'DRAW';
  }, [winningTeamId]);

  return {
    winningTeamId,
    podiumMembers,
    listMembers,
    winningScore,
    PodiumSrc,
    resultText,
  };
};
