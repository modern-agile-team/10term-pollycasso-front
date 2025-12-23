import { SOCKET_EVENTS } from '@/shared/api/socket/constants';
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
