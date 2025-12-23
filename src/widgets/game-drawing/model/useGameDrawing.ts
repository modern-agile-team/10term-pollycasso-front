import { useMemo } from 'react';

import type { DrawingContext, Player } from '@/entities/game';
import { useAuthStore } from '@/features/auth/model'; // TODO: useAuthStore 위치변경(shared)
import { MOCK_GAME_DRAWING } from '@/mocks/game.mock';

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
    return context?.currentTheme || '주제 대기 중...';
  }, [phaseContext]);

  return {
    status,
    players,
    endsAt,
    inventory,
    currentTheme,
  };
};
