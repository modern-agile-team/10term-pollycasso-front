import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import type { RoomState } from '@/entities/game';
import { useAuthStore } from '@/entities/user';
import { useSocket } from '@/shared/api/socket';
import {
  selectCanStartGame,
  selectMe,
  selectTopBottomTeams,
} from './roomSelectors';

export const useRoom = () => {
  const { roomId } = useParams();
  const { user } = useAuthStore();
  const { socket } = useSocket();

  const myUserId = user?.id;
  const [roomState, setRoomState] = useState<RoomState | null>(null);

  useEffect(() => {
    if (!roomId || !socket) return;

    const handleGameState = (newState: RoomState) => {
      setRoomState(newState);
    };

    socket.on('room:stateSync', handleGameState);

    socket.emit('room:join', { roomId });

    return () => {
      socket.off('room:stateSync', handleGameState);
      socket.emit('room:leave');
    };
  }, [roomId, socket]);

  const me = selectMe(roomState, myUserId ?? '');
  const isSolo = roomState?.settings?.gameMode === 'SOLO';
  const amIHost = roomState?.hostId === myUserId;

  const { topTeamId, bottomTeamId, topTeamPlayers, bottomTeamPlayers } =
    selectTopBottomTeams(roomState, myUserId ?? '');

  const canStartGame = selectCanStartGame(roomState);

  const startGame = () => {
    if (!roomId || !socket) return;
    socket.emit('room:start', { roomId });
  };

  const toggleReady = () => {
    if (!me || !myUserId || !socket) return;
    socket.emit('room:readyToggle', { userId: myUserId });
  };

  const leaveRoom = () => {
    if (!myUserId || !socket) return;
    socket.emit('room:leave');
  };

  const changeTeam = (targetTeam: 'BLUE' | 'RED') => {
    if (!myUserId || !socket) return;
    if (me?.teamId === targetTeam) return;

    socket.emit('room:changeTeam', {
      userId: myUserId,
      targetTeamId: targetTeam,
    });

    setRoomState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        players: prev.players.map((p) =>
          p.userId === myUserId ? { ...p, teamId: targetTeam } : p,
        ),
      };
    });
  };

  const kickUser = (targetUserId: string) => {
    if (!socket) return;
    socket.emit('room:kickUser', { targetUserId });
  };

  return {
    roomState,
    me,
    derived: {
      isSolo,
      amIHost,
      canStartGame,
      topTeamPlayers,
      bottomTeamPlayers,
      topTeamId,
      bottomTeamId,
    },
    actions: {
      startGame,
      toggleReady,
      leaveRoom,
      changeTeam,
      kickUser,
    },
    constants: {
      myUserId,
    },
  };
};
