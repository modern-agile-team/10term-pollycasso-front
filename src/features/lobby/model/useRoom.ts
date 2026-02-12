import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getWaitingSocket } from '@/shared/api/socket';
import type { RoomState, Player, SystemNotification } from '@/shared/model';
import { useAuthStore } from '@/entities/user';
import {
  selectCanStartGame,
  selectMe,
  selectTopBottomTeams,
} from './roomSelectors';
import { ENTRY_ERROR_MESSAGES } from '../constants/messages';
import type { UpdateGameStatePayload } from '../model/types';
import { useSound } from '@/entities/sound';
import { SOUND_ASSETS } from '@/shared/api/sound/assets';
import { SoundManager } from '@/shared/api/sound/manager';
import type { UpdateGameStatePayload } from '@/features/lobby/model/types';

export const useRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams<{ roomId: string }>();
  const { sfxVolume, isMuted } = useSound();
  const { user } = useAuthStore();

  const waitingSocket = getWaitingSocket();

  const [roomState, setRoomState] = useState<RoomState | null>(null);

  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const myUserId = user?.id;
  const initialPassword = location.state?.password;

  const joinRoom = useCallback(
    (password?: string) => {
      if (!roomId) return;

      setPasswordError(null);

      waitingSocket.emit('room:join', {
        roomId: Number(roomId),
        ...(password && { password }),
      });
    },
    [waitingSocket, roomId],
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
            if (!isMuted)
              SoundManager.playSfx(SOUND_ASSETS.SFX.LOBBY_KICK, sfxVolume);
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
      if (!isMuted)
        SoundManager.playSfx(SOUND_ASSETS.SFX.LOBBY_JOINED, sfxVolume);
    };

    const handleUpdateRoom = ({ roomSettings }: { roomSettings: any }) => {
      setRoomState((prev) =>
        prev ? { ...prev, settings: roomSettings } : null,
      );
      if (!isMuted)
        SoundManager.playSfx(SOUND_ASSETS.SFX.LOBBY_JOINED2, sfxVolume);
    };

    const handleUpdatePlayer = ({
      userId,
      changes,
    }: {
      userId: string;
      changes: Partial<Player>;
    }) => {
      setRoomState((prev) => {
        if (!prev) return null;
        if (!isMuted)
          SoundManager.playSfx(SOUND_ASSETS.SFX.LOBBY_JOINED, sfxVolume);
        return {
          ...prev,
          players: prev.players.map((p) =>
            String(p.userId) === String(userId) ? { ...p, ...changes } : p,
          ),
        };
      });
    };

    const handleStateSync = (newState: RoomState) => {
      setRoomState(newState);
    };

    const handleConnect = () => {
      joinRoom(initialPassword);
    };

    const handleUpdateGameState = ({
      phase,
      endsAt,
      phaseContext,
    }: UpdateGameStatePayload) => {
      setRoomState((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          status: phase,
          endsAt,
          phaseContext,
        };
      });
    };

    waitingSocket.on('room:joinSuccess', handleJoinSuccess);
    waitingSocket.on('room:syncPlayerList', handleSyncPlayerList);
    waitingSocket.on('room:updateRoom', handleUpdateRoom);
    waitingSocket.on('room:updatePlayer', handleUpdatePlayer);
    waitingSocket.on('room:stateSync', handleStateSync);
    waitingSocket.on('room:updateGameState', handleUpdateGameState);
    waitingSocket.on('connect', handleConnect);
    waitingSocket.on('system:notification', handleSystemNotification);

    if (waitingSocket.connected) {
      joinRoom(initialPassword);
    }

    return () => {
      waitingSocket.off('room:joinSuccess', handleJoinSuccess);
      waitingSocket.off('room:syncPlayerList', handleSyncPlayerList);
      waitingSocket.off('room:updateRoom', handleUpdateRoom);
      waitingSocket.off('room:updatePlayer', handleUpdatePlayer);
      waitingSocket.off('system:notification', handleSystemNotification);
      waitingSocket.off('room:stateSync', handleStateSync);
      waitingSocket.off('room:updateGameState', handleUpdateGameState);
      waitingSocket.off('connect', handleConnect);
    };
  }, [waitingSocket, roomId, joinRoom, initialPassword, navigate]);

  const me = selectMe(roomState, myUserId ?? '');
  const isSolo = roomState?.settings?.gameMode === 'SOLO';
  const amIHost = String(roomState?.hostId) === String(myUserId);
  const { topTeamId, bottomTeamId, topTeamPlayers, bottomTeamPlayers } =
    selectTopBottomTeams(roomState, myUserId ?? '');
  const canStartGame = selectCanStartGame(roomState);

  const startGame = () => waitingSocket.emit('game:startRequest');
  const toggleReady = () => waitingSocket.emit('room:readyToggle');
  const changeTeam = (targetTeam: 'BLUE' | 'RED' | 'NONE') => {
    if (!me || me.team === targetTeam) return;
    waitingSocket.emit('room:changeTeam', { targetTeam });
  };
  const kickUser = (targetUserId: string | number) =>
    waitingSocket.emit('room:kickUser', { targetUserId: Number(targetUserId) });
  const nudgeUser = (targetUserId: string | number) =>
    waitingSocket.emit('room:nudgeUser', {
      targetUserId: Number(targetUserId),
    });
  const leaveRoom = () => waitingSocket.emit('room:leave');
  const updateStatus = (status: 'IDLE' | 'SHOPPING' | 'CUSTOMIZING') => {
    if (status !== 'IDLE' && me?.isReady && !amIHost) {
      waitingSocket.emit('room:readyToggle');
    }

    waitingSocket.emit('room:updateStatus', { status });
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
