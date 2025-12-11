import { SOCKET_EVENTS } from '@/shared/api/socket/constants';
import type { MockSocket } from './mockSocket';

export function handleLobbySend(socket: MockSocket, payload: any) {
  const { message } = payload;
  const mainChatMsg = {
    id: Date.now().toString(),
    senderId: 'test-user',
    nickname: '테스트유저(Mock1)',
    message: message,
  };
  socket['trigger'](SOCKET_EVENTS.LOBBY_MESSAGE, mainChatMsg);
}

export function handleRoomJoin(socket: MockSocket) {
  socket['broadcastRoomState']();
}

export function handleRoomReadyToggle(socket: MockSocket, payload: any) {
  const userId = payload.userId || socket['roomState'].players[0]?.userId;
  const player = socket['roomState'].players.find(
    (p: any) => p.userId === userId,
  );

  if (player) {
    player.isReady = !player.isReady;
    socket['broadcastRoomState']();
  }
}

export function handleRoomChangeTeam(socket: MockSocket, payload: any) {
  const { targetTeamId, userId } = payload;
  const targetUser = userId || socket['roomState'].players[0]?.userId;
  const player = socket['roomState'].players.find(
    (p: any) => p.userId === targetUser,
  );

  if (player) {
    player.teamId = targetTeamId;
    player.isReady = false;
    socket['broadcastRoomState']();
  }
}

export function handleRoomKickUser(socket: MockSocket, payload: any) {
  const { targetUserId } = payload;
  socket['roomState'].players = socket['roomState'].players.filter(
    (p: any) => p.userId !== targetUserId,
  );
  socket['broadcastRoomState']();
}

export function handleRoomLeave(socket: MockSocket) {
  socket.broadcastRoomState();
}

export function handleChatSendMessage(socket: MockSocket, payload: any) {
  const { message, userId } = payload;
  const sender =
    socket['roomState'].players.find((p: any) => p.userId === userId) ||
    socket['roomState'].players[0];

  const newChatMessage = {
    id: Date.now().toString(),
    senderId: sender?.userId,
    nickname: sender?.nickname,
    message: message,
  };

  socket['trigger'](SOCKET_EVENTS.CHAT_NEW_MESSAGE, newChatMessage);
}
