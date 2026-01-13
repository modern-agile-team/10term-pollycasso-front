import { SOCKET_EVENTS } from '@/shared/api/socket';
import { ITEM_METADATA } from '@/shared/constants/item';
import type { GameItem, Player, ThemeSelectingContext } from '@/shared/model';
import { PHASE_TIME, RANDOM_THEMES } from '@/shared/model';
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

  if (
    socket.roomState.status === 'THEME_SELECTING' &&
    socket.roomState.phaseContext
  ) {
    (socket.roomState.phaseContext as ThemeSelectingContext).value = value;
  }

  socket['trigger'](SOCKET_EVENTS.GAME_TYPING_SHARE, { value });
};

export const handleGameThemeSubmit = (socket: MockSocket, payload: any) => {
  const { theme } = payload;

  socket['roomState'].status = 'DRAWING';
  socket['roomState'].phaseContext = {
    currentTheme: theme,
  };

  const drawingTimeMs = PHASE_TIME.DRAWING * 1000;
  socket['roomState'].endsAt = Date.now() + drawingTimeMs;

  socket['broadcastRoomState']();
};

export const handleGameThemeAutoSelect = (socket: MockSocket) => {
  const context = socket.roomState.phaseContext as ThemeSelectingContext | null;
  const savedInput = context?.value || '';

  let selectedTheme = savedInput;

  if (!selectedTheme.trim()) {
    const randomIndex = Math.floor(Math.random() * RANDOM_THEMES.length);
    selectedTheme = RANDOM_THEMES[randomIndex];
  }

  socket['roomState'].status = 'DRAWING';
  socket['roomState'].phaseContext = {
    currentTheme: selectedTheme,
  };

  socket['roomState'].endsAt = Date.now() + PHASE_TIME.DRAWING * 1000;
  socket['broadcastRoomState']();
};

export const handleGameUseItem = (socket: MockSocket, payload: any) => {
  const { itemId, targetUserId } = payload;
  const now = Date.now();

  const attacker = socket.roomState.players[0];
  const target = socket.roomState.players.find(
    (player: Player) => player.userId === targetUserId,
  );

  if (!attacker || !target) return;

  const itemInInven = attacker.inventory?.find((item: GameItem) => {
    return item.itemId === itemId;
  });

  if (!itemInInven || itemInInven.count <= 0) return;

  if (itemInInven.cooldownEndsAt && itemInInven.cooldownEndsAt > now) {
    return;
  }

  itemInInven.count -= 1;
  const duration = ITEM_METADATA[itemId]?.cooldown || 5000;
  itemInInven.cooldownEndsAt = now + duration;

  socket.broadcastRoomState();

  socket.trigger('game:itemNotification', {
    id: Date.now().toString(),
    message: `${attacker.nickname}님이 ${target.nickname}님에게 [${ITEM_METADATA[itemId]?.name || itemId}] 공격!`,
    type: 'attack',
  });

  socket.trigger('game:applyEffect', {
    itemId,
    targetUserId: target.userId,
    duration: 5000,
  });
};
