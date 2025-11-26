import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import ScalableText from '@/features/lobby/ui/ScalableText';
import { getSocket } from '@/shared/api/socket';
import type { RoomState, Player } from '@/entities/game/model/types';
import { Crown } from '@/assets';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { XMarkIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';
import { GameChat } from '@/entities/chat/ui/GameChat';

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const MY_USER_ID = 'id-1234';

  const [roomState, setRoomState] = useState<RoomState | null>(null);

  useEffect(() => {
    const socket = getSocket();
    socket.emit('joinRoom', { roomId });

    socket.on('gameState', (newState: RoomState) => {
      console.log('방 상태 받음:', newState);
      setRoomState(newState);
    });
    return () => {
      socket.off('gameState');
    };
  }, [roomId]);

  if (!roomState) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-3xl font-bold">
        로딩 중...
      </div>
    );
  }

  const me = roomState.players.find((p) => p.userId === MY_USER_ID);
  const myTeamId = me?.teamId || 'BLUE';
  const isMyTeamBlue = myTeamId === 'BLUE';

  const bluePlayers = roomState.players.filter((p) => p.teamId === 'BLUE');
  const redPlayers = roomState.players.filter((p) => p.teamId === 'RED');

  const topTeamPlayers = isMyTeamBlue ? [...bluePlayers] : [...redPlayers];
  const bottomTeamPlayers = isMyTeamBlue ? [...redPlayers] : [...bluePlayers];

  if (me) {
    topTeamPlayers.sort((a, b) => (a.userId === me.userId ? -1 : 1));
  }

  const amIHost = roomState?.hostId === MY_USER_ID;

  const otherPlayers = roomState.players.filter(
    (p) => p.userId !== roomState.hostId,
  );
  const canStartGame =
    otherPlayers.length > 0 && otherPlayers.every((p) => p.isReady);

  const handleMainAction = () => {
    if (amIHost) {
      if (canStartGame) {
        getSocket().emit('startGame', { roomId }); // 이벤트명은 백엔드와 협의 필요
        console.log('게임 시작!');
      } else {
        alert('모든 플레이어가 준비해야 시작할 수 있습니다!');
      }
    } else {
      if (!me) return;
      getSocket().emit('toggleReady', { userId: MY_USER_ID });
    }
  };

  const handleLeave = () => {
    const confirmLeave = window.confirm('정말 방을 나가시겠습니까?');
    if (confirmLeave) {
      getSocket().emit('leaveRoom', { userId: MY_USER_ID });
      navigate('/');
    }
  };

  const topGradient = isMyTeamBlue
    ? 'from-[#0088FF] to-[#005299]'
    : 'from-[#FF553F] to-[#993326]';

  const bottomGradient = isMyTeamBlue
    ? 'from-[#FF553F] to-[#993326]'
    : 'from-[#0088FF] to-[#005299]';

  const renderSlots = (players: Player[]) => {
    return Array.from({ length: 3 }).map((_, index) => {
      const player = players[index];

      if (player) {
        const isPlayerHost = roomState.hostId === player.userId;
        const showKickButton = amIHost && player.userId !== MY_USER_ID;

        const isReadyVisual = player.isReady || isPlayerHost;

        return (
          <div
            key={player.userId}
            className="w-full px-4 pt-6 rounded-2xl bg-white relative group"
          >
            {showKickButton && (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `정말 '${player.nickname}'님을 강퇴하시겠습니까?`,
                    )
                  ) {
                    console.log(`${player.nickname} 강퇴`);
                    getSocket().emit('kickUser', { targetId: player.userId });
                  }
                }}
                className="absolute -top-3 -right-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-[#FF553F] border-2 border-white text-white shadow-md transition-all duration-200 hover:bg-[#FF331F] hover:scale-110 active:scale-95"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex items-center gap-2 w-full">
                <div className="relative flex justify-center items-center shrink-0 w-10 h-10 rounded-full bg-[#82DC99] text-white font-bold text-lg shadow-sm">
                  {isPlayerHost && (
                    <img
                      src={Crown}
                      alt="방장"
                      className="absolute -top-5 left-1/2 -translate-x-1/2 w-7 h-auto z-10 drop-shadow-sm pointer-events-none"
                    />
                  )}
                  {player.level}
                </div>
                <div className="flex-1 min-w-0 text-2xl font-bold text-gray-800">
                  <ScalableText>{player.nickname}</ScalableText>
                </div>
              </div>

              {!isPlayerHost && (
                <div className="shrink-0 ml-2">
                  {player.isReady ? (
                    <span className="px-2.5 py-1 rounded-full bg-[#2ADB75] text-white text-md font-bold">
                      준비
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-gray-200 text-gray-500 text-md font-bold">
                      대기
                    </span>
                  )}
                </div>
              )}
            </div>

            <div
              className={`
                flex items-center justify-center
                w-full overflow-hidden bg-[#E3DDDD] rounded-lg
                border-[5px] transition-all duration-300 box-border
                ${
                  isReadyVisual
                    ? 'border-[#2ADB75] shadow-[0_0_15px_rgba(42,219,117,0.6)]'
                    : 'border-transparent'
                }
              `}
            >
              <img
                src=""
                alt="캐릭터"
                className="w-[200px] h-[200px] object-cover"
              />
            </div>
          </div>
        );
      } else {
        return (
          <div
            key={`empty-${index}`}
            className="px-4 pt-6 rounded-2xl bg-black/20"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-black/20"></div>
              <div className="w-36 h-9 rounded-full bg-black/20"></div>
            </div>
            <div className="w-full h-[200px] aspect-square rounded-lg bg-black/20"></div>
          </div>
        );
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-w-[1500px] mx-auto h-screen overflow-hidden gap-x-10 font-ssrm font-bold">
      <div className="flex justify-between w-[1500px] h-[760px] px-6 py-10 rounded-3xl bg-[#1E3411]/40">
        <div className="w-[840px] rounded-3xl bg-gray-300/40 flex flex-col overflow-hidden">
          <div className={`flex-1 bg-gradient-to-b ${topGradient} p-4`}>
            <div className="grid grid-cols-3 gap-4 w-full h-full">
              {renderSlots(topTeamPlayers)}
            </div>
          </div>

          <div className={`flex-1 bg-gradient-to-b ${bottomGradient} p-4`}>
            <div className="grid grid-cols-3 gap-4 w-full h-full">
              {renderSlots(bottomTeamPlayers)}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between w-[560px] p-5 rounded-3xl ">
          <div className="flex flex-col p-4 h-[449px] border border-white rounded-xl">
            {/* 상단 버튼 영역 */}
            <div className="grid grid-cols-3 gap-x-5 mb-2 text-white ">
              <div className="p-2 bg-white/50 rounded-xl">
                <button className="flex justify-between w-full h-full items-center py-2 px-4 rounded-xl bg-[#FF5353] hover:bg-[#FF5353]/70">
                  <ShoppingCartIcon className="w-8 h-8" />
                  <span className="text-2xl font-bold">상점</span>
                </button>
              </div>

              <div className="p-2 bg-white/50 rounded-xl">
                <button className="flex justify-between w-full h-full items-center py-2 px-4 rounded-xl bg-[#FFBD2F] hover:bg-[#FFBD2F]/70">
                  <ShoppingCartIcon className="w-8 h-8" />
                  <span className="text-2xl font-bold">옷장</span>
                </button>
              </div>

              <div className="p-2 bg-white/50 rounded-xl">
                <button className="flex justify-between w-full h-full items-center py-2 px-3 rounded-xl bg-black hover:bg-black/70">
                  <Cog8ToothIcon className="w-8 h-8" />
                  <span className="text-2xl font-bold">방설정</span>
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 mt-2">
              <GameChat />
            </div>
          </div>

          <div className="flex flex-col justify-between h-[178px]">
            <button
              onClick={handleMainAction}
              disabled={amIHost && !canStartGame}
              className={`w-full h-[79px] rounded-2xl text-3xl text-white font-bold shadow-md transition active:scale-95 flex items-center justify-center gap-2
                ${
                  amIHost
                    ? canStartGame
                      ? 'bg-[#2ADB75] hover:bg-[#20C064] cursor-pointer'
                      : 'bg-gray-400'
                    : me?.isReady
                      ? 'bg-[#FF5353] hover:bg-[#D9342B]'
                      : 'bg-[#2ADB75] hover:bg-[#20C064]'
                }`}
            >
              {amIHost ? '게임 시작' : me?.isReady ? '준비 취소' : '게임 준비'}
            </button>
            <button
              onClick={handleLeave}
              className="w-full h-[79px] rounded-2xl bg-black hover:bg-black/90 text-3xl text-white font-bold shadow-md transition active:scale-95"
            >
              방 나가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
