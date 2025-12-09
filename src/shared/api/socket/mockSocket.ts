import type { RoomState } from '@/entities/game/model';
import { MOCK_ROOM_STATE } from '@/mocks/game.mock';
import { SOCKET_EVENTS } from '@/shared/api/socket/constants';

type Listener = (...args: any[]) => void;

export class MockSocket {
  private listeners: Record<string, Listener[]> = {};
  private roomState: RoomState;
  public connected: boolean = false;
  public auth: { token?: string } = {};

  constructor() {
    this.roomState = JSON.parse(JSON.stringify(MOCK_ROOM_STATE));
    this.connect();
  }

  connect() {
    if (this.connected) return;
    this.connected = true;
    setTimeout(() => {
      this.trigger(SOCKET_EVENTS.CONNECT);
      this.trigger(SOCKET_EVENTS.ROOM_STATE_SYNC, this.roomState);
    }, 100);
  }

  disconnect() {
    this.connected = false;
    this.trigger(SOCKET_EVENTS.DISCONNECT);
  }

  on(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback?: Listener) {
    if (!this.listeners[event]) return;
    if (callback) {
      this.listeners[event] = this.listeners[event].filter(
        (cb) => cb !== callback,
      );
    } else {
      delete this.listeners[event];
    }
  }

  private broadcastRoomState() {
    const newState = JSON.parse(JSON.stringify(this.roomState));
    this.trigger(SOCKET_EVENTS.ROOM_STATE_SYNC, newState);
  }

  private trigger(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((cb) => cb(...args));
    }
  }

  emit(event: string, ...args: any[]) {
    const payload = args[0] || {};

    switch (event) {
      case SOCKET_EVENTS.LOBBY_SEND:
        this.handleLobbySend(payload);
        break;

      case SOCKET_EVENTS.ROOM_JOIN:
        this.handleRoomJoin();
        break;

      case SOCKET_EVENTS.ROOM_READY_TOGGLE:
        this.handleRoomReadyToggle(payload);
        break;

      case SOCKET_EVENTS.ROOM_CHANGE_TEAM:
        this.handleRoomChangeTeam(payload);
        break;

      case SOCKET_EVENTS.ROOM_KICK_USER:
        this.handleRoomKickUser(payload);
        break;

      case SOCKET_EVENTS.ROOM_LEAVE:
        this.handleRoomLeave();
        break;

      case SOCKET_EVENTS.CHAT_SEND_MESSAGE:
        this.handleChatSendMessage(payload);
        break;

      default:
        break;
    }
  }

  private handleLobbySend(payload: any) {
    const { message } = payload;
    const mainChatMsg = {
      id: Date.now().toString(),
      senderId: 'test-user',
      nickname: '테스트유저(Mock1)',
      message: message,
    };
    this.trigger(SOCKET_EVENTS.LOBBY_MESSAGE, mainChatMsg);
  }

  private handleRoomJoin() {
    this.broadcastRoomState();
  }

  private handleRoomReadyToggle(payload: any) {
    const userId = payload.userId || this.roomState.players[0]?.userId;
    const player = this.roomState.players.find((p) => p.userId === userId);

    if (player) {
      player.isReady = !player.isReady;
      this.broadcastRoomState();
    }
  }

  private handleRoomChangeTeam(payload: any) {
    const { targetTeamId, userId } = payload;
    const targetUser = userId || this.roomState.players[0]?.userId;
    const player = this.roomState.players.find((p) => p.userId === targetUser);

    if (player) {
      player.teamId = targetTeamId;
      player.isReady = false;
      this.broadcastRoomState();
    }
  }

  private handleRoomKickUser(payload: any) {
    const { targetUserId } = payload;
    this.roomState.players = this.roomState.players.filter(
      (p) => p.userId !== targetUserId,
    );
    this.broadcastRoomState();
  }

  private handleRoomLeave() {
    // TODO: 유저 방 나가기 처리
  }

  private handleChatSendMessage(payload: any) {
    const { message, userId } = payload;
    const sender =
      this.roomState.players.find((p) => p.userId === userId) ||
      this.roomState.players[0];

    const newChatMessage = {
      id: Date.now().toString(),
      senderId: sender?.userId,
      nickname: sender?.nickname,
      message: message,
    };

    this.trigger(SOCKET_EVENTS.CHAT_NEW_MESSAGE, newChatMessage);
  }
}
