import { useNavigate } from 'react-router';

import { useRoom } from '../model/useRoom';

export const useRoomUI = () => {
  const navigate = useNavigate();
  const {
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
      nudgeUser,
      updateStatus,
    },
  } = useRoom();

  const isMyTeamBlue = topTeamId === 'BLUE';

  const topGradient = isSolo
    ? 'from-transparent to-transparent'
    : isMyTeamBlue
      ? 'from-[#0088FF] to-[#005299]'
      : 'from-[#FF553F] to-[#993326]';

  const bottomGradient = isSolo
    ? 'from-transparent to-transparent'
    : isMyTeamBlue
      ? 'from-[#FF553F] to-[#993326]'
      : 'from-[#0088FF] to-[#005299]';

  const handleMainAction = () => {
    if (amIHost) {
      if (canStartGame) {
        startGame();
      } else {
        alert('모든 플레이어가 준비해야 시작할 수 있습니다!');
      }
    } else {
      toggleReady();
    }
  };

  const handleLeave = () => {
    if (window.confirm('정말 방을 나가시겠습니까?')) {
      leaveRoom();
      navigate('/');
    }
  };

  const handleChangeTeam = (targetTeam: 'BLUE' | 'RED') => {
    changeTeam(targetTeam);
  };

  const handleKick = (targetId: string, nickname: string) => {
    if (window.confirm(`정말 '${nickname}'님을 강퇴하시겠습니까?`)) {
      kickUser(targetId);
    }
  };

  const handleNudge = (targetId: string) => {
    nudgeUser(targetId);
  };

  const handleUpdateStatus = (status: 'IDLE' | 'SHOPPING' | 'CUSTOMIZING') => {
    updateStatus(status);
  };

  return {
    roomState,
    me,
    topGradient,
    bottomGradient,
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
      handleMainAction,
      handleLeave,
      handleChangeTeam,
      handleKick,
      handleNudge,
      handleUpdateStatus,
    },
  };
};
