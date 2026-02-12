import { useEffect, useMemo, useState } from 'react';

import { useAuthStore } from '@/entities/user';
import { MOCK_GAME_SELECTING } from '@/mocks/game.mock';
import type { DrawingContext, Player, RoomState } from '@/shared/model';
import { useGameSocket } from '@/shared/api/socket/GameSocketProvider';
import { SOCKET_EVENTS } from '@/shared/api/socket';

export const useGameState = () => {
  const user = useAuthStore((state) => state.user);
  const { gameSocket } = useGameSocket();

  const [roomState, setRoomState] = useState<RoomState>(MOCK_GAME_SELECTING);

  useEffect(() => {
    if (!gameSocket) return;

    const handleUpdate = (payload: any) => {
      console.log('📢 Game Event Received:', payload);
      // 백엔드에서 준 payload가 전체 RoomState인지, 일부 업데이트인지에 따라 처리
      setRoomState((prev) => ({
        ...prev,
        ...payload,
        status: payload.phase || payload.status || prev.status, // 백엔드 필드명(phase) 대응
      }));
    };

    gameSocket.on('room:stateSync', handleUpdate);
    gameSocket.on('room:updateGameState', handleUpdate);

    return () => {
      gameSocket.off('room:stateSync', handleUpdate);
      gameSocket.off('room:updateGameState', handleUpdate);
    };
  }, [gameSocket]);

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
