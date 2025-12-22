import { useAuthStore } from '@/features/auth/model'; // TODO: useAuthStore 위치변경(shared)
import { MOCK_GAME_DRAWING } from '@/mocks/game.mock';
import type { DrawingContext } from '@/entities/game/model/types';
import { useMemo } from 'react';

export const useGameDrawing = () => {
  const user = useAuthStore((state) => state.user);

  const gameState = MOCK_GAME_DRAWING;
  const { status, players, endsAt, phaseContext } = gameState;

  const myData = useMemo(() => {
    if (!user) return null;
    return players.find((p) => p.userId === user.id);
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
