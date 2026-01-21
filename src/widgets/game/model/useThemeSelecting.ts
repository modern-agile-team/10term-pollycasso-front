import { useMemo } from 'react';

import { useAuthStore } from '@/entities/user';
import { MOCK_GAME_SELECTING } from '@/mocks/game.mock';
import type { ThemeSelectingContext } from '@/shared/model';

export const useThemeSelecting = () => {
  const user = useAuthStore((state) => state.user);
  const { status, phaseContext } = MOCK_GAME_SELECTING;

  const isMyTurn = useMemo(() => {
    if (!user || status !== 'THEME_SELECTING') return false;

    const context = phaseContext as ThemeSelectingContext;
    return context.selectorId === user.id;
  }, [user, status, phaseContext]);

  return {
    isMyTurn,
  };
};
