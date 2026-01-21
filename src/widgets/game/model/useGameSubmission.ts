import { useCallback, useMemo } from 'react';

import { useAuthStore } from '@/entities/user';
import { SOCKET_EVENTS, useSocket } from '@/shared/api/socket';
import type { Player } from '@/shared/model';
import { useGameState } from './useGameState';

interface GameSubmissionState {
  players: Player[];
  isMeReady: boolean;
  completedCount: number;
  totalCount: number;
  toggleReady: () => void;
}

export const useGameSubmission = (): GameSubmissionState => {
  const { socket } = useSocket();
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
    if (!socket) return;

    socket.emit(SOCKET_EVENTS.ROOM_READY_TOGGLE);
  }, [socket]);

  return {
    players,
    isMeReady,
    completedCount,
    totalCount,
    toggleReady,
  };
};
