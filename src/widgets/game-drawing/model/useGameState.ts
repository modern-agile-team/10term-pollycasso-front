import { useMemo } from 'react';

import type { DrawingContext, Player } from '@/entities/game';
import { useAuthStore } from '@/entities/user';
import { MOCK_GAME_SELECTING } from '@/mocks/game.mock';

export const useGameState = () => {
  const user = useAuthStore((state) => state.user);

  const gameState = MOCK_GAME_SELECTING;
  //   const gameState = MOCK_GAME_DRAWING;
  const { status, players, endsAt, phaseContext } = gameState;

  const myData = useMemo(() => {
    if (!user) return null;
    return players.find((p: Player) => p.userId === user.id);
  }, [players, user]);

  const inventory = myData?.inventory || [];

  const currentTheme = useMemo(() => {
    if (status !== 'DRAWING') return null;

    const context = phaseContext as DrawingContext;
    return context?.currentTheme || null;
  }, [status, phaseContext]);

  return {
    status,
    players,
    endsAt,
    inventory,
    currentTheme,
  };
};
