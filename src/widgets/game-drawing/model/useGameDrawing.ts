import { useMemo } from 'react';

import { useAuthStore } from '@/entities/user';
import { MOCK_GAME_DRAWING } from '@/mocks/game.mock';
import type { DrawingContext, Player } from '@/shared/model';

export const useGameDrawing = () => {
  const user = useAuthStore((state) => state.user);

  const gameState = MOCK_GAME_DRAWING;
  const { status, players, endsAt, phaseContext } = gameState;

  const myData = useMemo(() => {
    if (!user) return null;
    return players.find((p: Player) => p.userId === user.id);
  }, [players, user]);

  const inventory = myData?.inventory || [];

  const currentTheme = useMemo(() => {
    const context = phaseContext as DrawingContext;
    return context?.currentTheme || null;
  }, [phaseContext]);

  return {
    status,
    players,
    endsAt,
    inventory,
    currentTheme,
  };
};
