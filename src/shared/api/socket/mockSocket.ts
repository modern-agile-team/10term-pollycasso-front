import { MOCK_GAME_DRAWING } from '@/mocks/game.mock';
import { SOCKET_EVENTS } from '@/shared/api/socket';
import type { RoomState } from '@/shared/model';
import {
  handleChatSendMessage,
  handleGameThemeSubmit,
  handleGameTyping,
  handleLobbySend,
  handleRoomChangeTeam,
  handleRoomJoin,
  handleRoomKickUser,
  handleRoomLeave,
  handleRoomReadyToggle,
} from './socketHandlers';

type Listener = (...args: any[]) => void;

export class MockSocket {
  private listeners: Record<string, Listener[]> = {};
  private roomState: RoomState;
  public connected: boolean = false;
  public auth: { token?: string } = {};

  constructor() {
    this.roomState = JSON.parse(JSON.stringify(MOCK_GAME_DRAWING));
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

  public broadcastRoomState() {
    const newState = JSON.parse(JSON.stringify(this.roomState));
    this.trigger(SOCKET_EVENTS.ROOM_STATE_SYNC, newState);
  }

  public trigger(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((cb) => cb(...args));
    }
  }

  emit(event: string, ...args: any[]) {
    const payload = args[0] || {};

    switch (event) {
      case SOCKET_EVENTS.LOBBY_SEND:
        handleLobbySend(this, payload);
        break;

      case SOCKET_EVENTS.ROOM_JOIN:
        handleRoomJoin(this);
        break;

      case SOCKET_EVENTS.ROOM_READY_TOGGLE:
        handleRoomReadyToggle(this, payload);
        break;

      case SOCKET_EVENTS.ROOM_CHANGE_TEAM:
        handleRoomChangeTeam(this, payload);
        break;

      case SOCKET_EVENTS.ROOM_KICK_USER:
        handleRoomKickUser(this, payload);
        break;

      case SOCKET_EVENTS.ROOM_LEAVE:
        handleRoomLeave(this);
        break;

      case SOCKET_EVENTS.CHAT_SEND_MESSAGE:
        handleChatSendMessage(this, payload);
        break;

      case SOCKET_EVENTS.GAME_TYPING:
        handleGameTyping(this, payload);
        break;

      case SOCKET_EVENTS.GAME_THEME_SUBMIT:
        handleGameThemeSubmit(this, payload);
        break;

      default:
        break;
    }
  }
}
