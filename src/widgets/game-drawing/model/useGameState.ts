import { useEffect, useMemo, useState } from 'react';

import { useAuthStore } from '@/entities/user';
import { MOCK_GAME_SELECTING } from '@/mocks/game.mock';
import { SOCKET_EVENTS, useSocket } from '@/shared/api/socket';
import type { DrawingContext, Player, RoomState } from '@/shared/model';

export const useGameState = () => {
  const user = useAuthStore((state) => state.user);
  const { socket } = useSocket();

  const [roomState, setRoomState] = useState<RoomState>(MOCK_GAME_SELECTING);

  useEffect(() => {
    if (!socket) return;

    const handleStateSync = (newState: RoomState) => {
      setRoomState(newState);
    };

    socket.on(SOCKET_EVENTS.ROOM_STATE_SYNC, handleStateSync);

    return () => {
      socket.off(SOCKET_EVENTS.ROOM_STATE_SYNC, handleStateSync);
    };
  }, [socket]);

  const { status, players, endsAt, phaseContext } = roomState;

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
