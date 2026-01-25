import type { FinishContext, Player } from '@/shared/model';
import { useMemo } from 'react';

export interface GameResultMember extends Player {
  rank: number;
  expGained: number;
  coinsGained: number;
  didLevelUp: boolean;

  isOnPodium: boolean;
}

export const useGameFinished = (
  players: Player[],
  finishContext: FinishContext | null,
): GameResultMember[] => {
  const sortedResults = useMemo(() => {
    if (!finishContext || !finishContext.results) return [];

    const mergedList = finishContext.results.map((result) => {
      const player = players.find((p) => p.userId === result.userId);

      if (!player) return null;

      return {
        ...player,
        ...result,
        isOnPodium: result.rank <= 3,
      };
    });

    return mergedList
      .filter((item): item is GameResultMember => item !== null)
      .sort((a, b) => a.rank - b.rank);
  }, [players, finishContext]);

  return sortedResults;
};
