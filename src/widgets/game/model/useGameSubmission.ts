import { useCallback, useMemo } from 'react';

import { useAuthStore } from '@/entities/user';
import type { Player } from '@/shared/model';
import { useGameState } from './useGameState';
import { useGameSocket } from '@/shared/api/socket/GameSocketProvider';
import { SOCKET_EVENTS } from '@/shared/api/socket';

interface GameSubmissionState {
  players: Player[];
  isMeReady: boolean;
  completedCount: number;
  totalCount: number;
  toggleReady: () => void;
}

export const useGameSubmission = (): GameSubmissionState => {
  const { gameSocket } = useGameSocket();
  const user = useAuthStore((state) => state.user);

  const { players } = useGameState();

  const totalCount = players.length;

  const completedCount = useMemo(() => {
    return players.filter((p) => p.isReady).length;
  }, [players]);

  const isMeReady = useMemo(() => {
    if (!user) return false;
    return players.find((p) => p.userId === user.id)?.isReady ?? false;
  }, [players, user]);

  const toggleReady = useCallback(() => {
    if (!gameSocket) return;

    gameSocket.emit(SOCKET_EVENTS.ROOM_READY_TOGGLE);
  }, [gameSocket]);

  return {
    players,
    isMeReady,
    completedCount,
    totalCount,
    toggleReady,
  };
};
