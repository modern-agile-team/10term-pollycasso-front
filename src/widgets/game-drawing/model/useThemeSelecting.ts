import { useMemo } from 'react';

import type { ThemeSelectingContext } from '@/entities/game';
import { useAuthStore } from '@/entities/user';
import { MOCK_GAME_SELECTING } from '@/mocks/game.mock';

export const useThemeSelecting = () => {
  const user = useAuthStore((state) => state.user);
  const { status, phaseContext } = MOCK_GAME_SELECTING;

  const isMyTurn = useMemo(() => {
    if (!user || status !== 'THEME_SELECTING') return false;

    const context = phaseContext as ThemeSelectingContext;
    return context.selectorId === user.id;
  }, [user, status, phaseContext]);

  const selectingValue = useMemo(() => {
    if (status !== 'THEME_SELECTING') return '';

    const context = phaseContext as ThemeSelectingContext;
    return context.value || '';
  }, [status, phaseContext]);

  return {
    isMyTurn,
    selectingValue,
  };
};
