import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getGameSocket } from '@/shared/api/socket';
import type { RoomState, Player } from '@/shared/model';
import { useAuthStore } from '@/entities/user';
import {
  selectCanStartGame,
  selectMe,
  selectTopBottomTeams,
} from './roomSelectors';

export const useRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useAuthStore();

  const gameSocket = getGameSocket();

  const [roomState, setRoomState] = useState<RoomState | null>(null);
  const myUserId = user?.id;

  useEffect(() => {
    if (!roomId) return;

    const joinRoom = () => {
      gameSocket.emit('room:join', { roomId: Number(roomId) });
    };

    const handleJoinSuccess = (initialState: RoomState) => {
      setRoomState(initialState);
    };

    const handleSyncPlayerList = ({ players }: { players: Player[] }) => {
      setRoomState((prev) => (prev ? { ...prev, players } : null));
    };

    const handleUpdateRoom = ({ roomSettings }: { roomSettings: any }) => {
      setRoomState((prev) =>
        prev ? { ...prev, settings: roomSettings } : null,
      );
    };

    const handleUpdatePlayer = ({
      userId,
      changes,
    }: {
      userId: string;
      changes: any;
    }) => {
      setRoomState((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          players: prev.players.map((p) =>
            String(p.userId) === String(userId) ? { ...p, ...changes } : p,
          ),
        };
      });
    };

    gameSocket.on('room:joinSuccess', handleJoinSuccess);
    gameSocket.on('room:syncPlayerList', handleSyncPlayerList);
    gameSocket.on('room:updateRoom', handleUpdateRoom);
    gameSocket.on('room:updatePlayer', handleUpdatePlayer);

    // 안전한 입장 요청 로직 (타이밍 이슈 방지)
    if (gameSocket.connected) {
      joinRoom();
    } else {
      gameSocket.on('connect', joinRoom);
    }

    return () => {
      gameSocket.off('room:joinSuccess', handleJoinSuccess);
      gameSocket.off('room:syncPlayerList', handleSyncPlayerList);
      gameSocket.off('room:updateRoom', handleUpdateRoom);
      gameSocket.off('room:updatePlayer', handleUpdatePlayer);

      // 중복 입장 방지
      gameSocket.off('connect', joinRoom);
    };
  }, [gameSocket, roomId]);

  const me = selectMe(roomState, myUserId ?? '');
  const isSolo = roomState?.settings?.gameMode === 'SOLO';
  const amIHost = String(roomState?.hostId) === String(myUserId);

  const { topTeamId, bottomTeamId, topTeamPlayers, bottomTeamPlayers } =
    selectTopBottomTeams(roomState, myUserId ?? '');

  const canStartGame = selectCanStartGame(roomState);

  const startGame = () => {
    gameSocket.emit('game:startRequest');
  };

  const toggleReady = () => {
    gameSocket.emit('room:readyToggle');
  };

  const changeTeam = (targetTeam: 'BLUE' | 'RED' | 'NONE') => {
    if (!me || me.team === targetTeam) return;
    gameSocket.emit('room:changeTeam', { targetTeam });
  };

  const kickUser = (targetUserId: string | number) => {
    gameSocket.emit('room:kickUser', { targetUserId: Number(targetUserId) });
  };

  const nudgeUser = (targetUserId: string | number) => {
    gameSocket.emit('room:nudgeUser', { targetUserId: Number(targetUserId) });
  };

  const leaveRoom = () => {
    gameSocket.emit('room:leave');
  };

  const updateStatus = (status: 'IDLE' | 'SHOPPING' | 'CUSTOMIZING') => {
    // 상점이나 옷장 이동 시 준비 해제
    if (status !== 'IDLE' && me?.isReady) {
      gameSocket.emit('room:readyToggle');
    }

    gameSocket.emit('room:updateStatus', { status });
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
      nudgeUser,
      kickUser,
      updateStatus,
    },
    constants: {
      myUserId,
    },
  };
};
