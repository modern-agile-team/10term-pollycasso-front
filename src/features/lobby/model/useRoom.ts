import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSocket } from '@/shared/api/socket';
import type { RoomState } from '@/entities/game/model/types';
import {
  selectCanStartGame,
  selectMe,
  selectTopBottomTeams,
} from './roomSelectors';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

export const useRoom = () => {
  const { roomId } = useParams();
  const { user } = useAuthStore();
  const myUserId = user?.id;
  const [roomState, setRoomState] = useState<RoomState | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const socket = getSocket();

    const handleGameState = (newState: RoomState) => {
      setRoomState(newState);
    };

    socket.emit('joinRoom', { roomId });
    socket.on('gameState', handleGameState);

    return () => {
      socket.off('gameState', handleGameState);
    };
  }, [roomId]);

  const me = selectMe(roomState, myUserId ?? '');
  const isSolo = roomState?.settings?.gameMode === 'SOLO';
  const amIHost = roomState?.hostId === myUserId;

  const { topTeamId, bottomTeamId, topTeamPlayers, bottomTeamPlayers } =
    selectTopBottomTeams(roomState, myUserId ?? '');

  const canStartGame = selectCanStartGame(roomState);

  const startGame = () => {
    if (!roomId) return;
    getSocket().emit('startGame', { roomId });
  };

  const toggleReady = () => {
    if (!me || !myUserId) return;
    getSocket().emit('toggleReady', { userId: myUserId });
  };

  const leaveRoom = () => {
    if (!myUserId) return;
    getSocket().emit('leaveRoom', { userId: myUserId });
  };

  const changeTeam = (targetTeam: 'BLUE' | 'RED') => {
    if (!myUserId) return;
    if (me?.teamId === targetTeam) return;
    getSocket().emit('changeTeam', { userId: myUserId, teamId: targetTeam });

    // 낙관적 업데이트
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

  const kickUser = (targetId: string) => {
    getSocket().emit('kickUser', { targetId });
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
