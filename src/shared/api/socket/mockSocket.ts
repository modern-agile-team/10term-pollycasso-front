import {
  handleFriendAccept,
  handleFriendBlock,
  handleFriendDelete,
  handleFriendGetList,
  handleFriendGetRecommended,
  handleFriendRequestSend,
  handleFriendSearch,
} from '@/mocks/friend.mock';
import { MOCK_GAME_SELECTING } from '@/mocks/game.mock';
import { SOCKET_EVENTS } from '@/shared/api/socket';
import type { RoomState } from '@/shared/model';
import { PHASE_TIME } from '@/shared/model';
import {
  handleChatSendMessage,
  handleGameThemeAutoSelect,
  handleGameThemeSubmit,
  handleGameTyping,
  handleGameUseItem,
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
  private phaseTimer: ReturnType<typeof setTimeout> | null = null;
  public roomState: RoomState;
  public connected: boolean = false;
  public auth: { token?: string } = {};

  constructor() {
    this.roomState = JSON.parse(JSON.stringify(MOCK_GAME_SELECTING));

    if (this.roomState.status === 'THEME_SELECTING') {
      this.roomState.endsAt = Date.now() + PHASE_TIME.THEME_SELECT * 1000;
    }

    this.connect();
  }

  connect() {
    if (this.connected) return;
    this.connected = true;
    setTimeout(() => {
      this.trigger(SOCKET_EVENTS.CONNECT);
      this.trigger(SOCKET_EVENTS.ROOM_STATE_SYNC, this.roomState);

      this.schedulePhaseTimer();
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

  private schedulePhaseTimer() {
    if (this.phaseTimer) clearTimeout(this.phaseTimer);

    const { status, endsAt } = this.roomState;

    if (status === 'THEME_SELECTING' && endsAt) {
      const timeLeft = endsAt - Date.now();

      if (timeLeft > 0) {
        this.phaseTimer = setTimeout(() => {
          handleGameThemeAutoSelect(this);
        }, timeLeft);
      } else {
        handleGameThemeAutoSelect(this);
      }
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
        if (this.phaseTimer) clearTimeout(this.phaseTimer);
        handleGameThemeSubmit(this, payload);
        break;

      case SOCKET_EVENTS.FRIEND_GET_ALL:
        handleFriendGetList(this);
        break;

      case SOCKET_EVENTS.FRIEND_GET_RECOMMENDED:
        handleFriendGetRecommended(this);
        break;

      case SOCKET_EVENTS.FRIEND_REQUEST_SEND:
        handleFriendRequestSend(this, payload);
        break;

      case SOCKET_EVENTS.FRIEND_ACCEPT:
        handleFriendAccept(this, payload);
        break;

      case SOCKET_EVENTS.FRIEND_REJECT:
        handleFriendDelete(this, payload);
        break;

      case SOCKET_EVENTS.FRIEND_BLOCK:
        handleFriendBlock(this, payload);
        break;

      case SOCKET_EVENTS.FRIEND_DELETE:
        handleFriendDelete(this, payload);
        break;

      case SOCKET_EVENTS.FRIEND_SEARCH:
        handleFriendSearch(this, payload);
      case SOCKET_EVENTS.GAME_USE_ITEM:
        handleGameUseItem(this, payload);
        break;

      default:
        break;
    }
  }
}
