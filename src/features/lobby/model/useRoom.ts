import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getGameSocket } from '@/shared/api/socket';
import type { RoomState, Player, SystemNotification } from '@/shared/model';
import { useAuthStore } from '@/entities/user';
import {
  selectCanStartGame,
  selectMe,
  selectTopBottomTeams,
} from './roomSelectors';
import { ENTRY_ERROR_MESSAGES } from '../constants/messages';

export const useRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useAuthStore();
  const gameSocket = getGameSocket();

  const [roomState, setRoomState] = useState<RoomState | null>(null);

  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const myUserId = user?.id;
  const initialPassword = location.state?.password;

  const joinRoom = useCallback(
    (password?: string) => {
      if (!roomId) return;

      setPasswordError(null);

      gameSocket.emit('room:join', {
        roomId: Number(roomId),
        ...(password && { password }),
      });
    },
    [gameSocket, roomId],
  );

  useEffect(() => {
    if (!roomId) return;

    const handleJoinSuccess = (initialState: RoomState) => {
      setRoomState(initialState);

      setIsPasswordRequired(false);
      setPasswordError(null);
    };

    const handleSystemNotification = (response: SystemNotification) => {
      if (response.status >= 400) {
        // 메시지 상수에서 찾고, 없으면 백엔드 메시지, 그것도 없으면 기본값
        const koreanMessage =
          ENTRY_ERROR_MESSAGES[response.code] ||
          response.message ||
          ENTRY_ERROR_MESSAGES.DEFAULT;

        switch (response.code) {
          case 'ROOM_PASSWORD_REQUIRED':
            setIsPasswordRequired(true);
            break;

          case 'ROOM_INVALID_PASSWORD':
          case 'INVALID_INPUT':
            setPasswordError(koreanMessage);
            break;

          case 'ROOM_KICKED':
            navigate('/', {
              state: { isKicked: true },
              replace: true,
            });
            break;

          case 'ROOM_NOT_FOUND':
          case 'ROOM_FULL':
          case 'GAME_ALREADY_STARTED':
          case 'ACCESS_TOKEN_MISSING':
          case 'EXPIRED_ACCESS_TOKEN':
          case 'INVALID_ACCESS_TOKEN':
          case 'PERMISSION_DENIED':
            alert(koreanMessage);
            navigate('/');
            break;

          default:
            alert(koreanMessage);
            navigate('/');
            break;
        }
      }
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

    gameSocket.on('system:notification', handleSystemNotification);

    if (gameSocket.connected) {
      joinRoom(initialPassword);
    } else {
      gameSocket.once('connect', () => joinRoom(initialPassword));
    }

    return () => {
      gameSocket.off('room:joinSuccess', handleJoinSuccess);
      gameSocket.off('room:syncPlayerList', handleSyncPlayerList);
      gameSocket.off('room:updateRoom', handleUpdateRoom);
      gameSocket.off('room:updatePlayer', handleUpdatePlayer);
      gameSocket.off('system:notification', handleSystemNotification);
    };
  }, [gameSocket, roomId, joinRoom, location.state?.password]);

  const me = selectMe(roomState, myUserId ?? '');
  const isSolo = roomState?.settings?.gameMode === 'SOLO';
  const amIHost = String(roomState?.hostId) === String(myUserId);
  const { topTeamId, bottomTeamId, topTeamPlayers, bottomTeamPlayers } =
    selectTopBottomTeams(roomState, myUserId ?? '');
  const canStartGame = selectCanStartGame(roomState);

  const startGame = () => gameSocket.emit('game:startRequest');
  const toggleReady = () => gameSocket.emit('room:readyToggle');
  const changeTeam = (targetTeam: 'BLUE' | 'RED' | 'NONE') => {
    if (!me || me.team === targetTeam) return;
    gameSocket.emit('room:changeTeam', { targetTeam });
  };
  const kickUser = (targetUserId: string | number) =>
    gameSocket.emit('room:kickUser', { targetUserId: Number(targetUserId) });
  const nudgeUser = (targetUserId: string | number) =>
    gameSocket.emit('room:nudgeUser', { targetUserId: Number(targetUserId) });
  const leaveRoom = () => gameSocket.emit('room:leave');
  const updateStatus = (status: 'IDLE' | 'SHOPPING' | 'CUSTOMIZING') => {
    if (status !== 'IDLE' && me?.isReady && !amIHost) {
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
      // UI에 필요한 상태들
      isPasswordRequired,
      passwordError,
    },
    actions: {
      startGame,
      toggleReady,
      leaveRoom,
      changeTeam,
      nudgeUser,
      kickUser,
      updateStatus,
      joinWithPassword: (password: string) => joinRoom(password),
    },
    constants: {
      myUserId,
    },
  };
};
