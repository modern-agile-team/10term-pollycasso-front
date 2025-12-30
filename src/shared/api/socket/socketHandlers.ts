import { SOCKET_EVENTS } from '@/shared/api/socket';
import { PHASE_TIME } from '@/shared/model';
import type { MockSocket } from './mockSocket';

export const handleLobbySend = (socket: MockSocket, payload: any) => {
  const { message } = payload;

  const mainChatMsg = {
    id: Date.now().toString(),
    senderId: 'test-user',
    nickname: '테스트유저(Mock1)',
    message,
  };

  socket['trigger'](SOCKET_EVENTS.LOBBY_MESSAGE, mainChatMsg);
};

export const handleRoomJoin = (socket: MockSocket) => {
  socket['broadcastRoomState']();
};

export const handleRoomReadyToggle = (socket: MockSocket, payload: any) => {
  const userId = payload.userId || socket['roomState'].players[0]?.userId;

  const player = socket['roomState'].players.find(
    (p: any) => p.userId === userId,
  );

  if (!player) return;

  player.isReady = !player.isReady;
  socket['broadcastRoomState']();
};

export const handleRoomChangeTeam = (socket: MockSocket, payload: any) => {
  const { targetTeamId, userId } = payload;
  const targetUserId = userId || socket['roomState'].players[0]?.userId;

  const player = socket['roomState'].players.find(
    (p: any) => p.userId === targetUserId,
  );

  if (!player) return;

  player.teamId = targetTeamId;
  player.isReady = false;
  socket['broadcastRoomState']();
};

export const handleRoomKickUser = (socket: MockSocket, payload: any) => {
  const { targetUserId } = payload;

  socket['roomState'].players = socket['roomState'].players.filter(
    (p: any) => p.userId !== targetUserId,
  );

  socket['broadcastRoomState']();
};

export const handleRoomLeave = (socket: MockSocket) => {
  socket.broadcastRoomState();
};

export const handleChatSendMessage = (socket: MockSocket, payload: any) => {
  const { message, userId } = payload;

  const sender =
    socket['roomState'].players.find((p: any) => p.userId === userId) ??
    socket['roomState'].players[0];

  const newChatMessage = {
    id: Date.now().toString(),
    senderId: sender?.userId,
    nickname: sender?.nickname,
    message,
  };

  socket['trigger'](SOCKET_EVENTS.CHAT_NEW_MESSAGE, newChatMessage);
};

export const handleGameTyping = (socket: MockSocket, payload: any) => {
  const { value } = payload;
  console.log(`[MockServer] 타이핑 수신중: ${value}`);
  socket['trigger'](SOCKET_EVENTS.GAME_TYPING_SHARE, { value });
};

export const handleGameThemeSubmit = (socket: MockSocket, payload: any) => {
  const { theme } = payload;

  console.log(`[MockServer] 주제 확정됨: ${theme}, 그리기 단계로 전환합니다.`);

  socket['roomState'].status = 'DRAWING';

  socket['roomState'].phaseContext = {
    currentTheme: theme,
  };

  const drawingTimeMs = PHASE_TIME.DRAWING * 1000;
  socket['roomState'].endsAt = Date.now() + drawingTimeMs;

  socket['broadcastRoomState']();
};
