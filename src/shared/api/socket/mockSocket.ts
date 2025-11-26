import type { RoomState } from '@/entities/game/model';
import { MOCK_ROOM_STATE } from '@/mocks/game.mock';

type Listener = (...args: any[]) => void;

export class MockSocket {
  private listeners: Record<string, Listener[]> = {};
  private roomState: RoomState;

  constructor() {
    this.roomState = JSON.parse(JSON.stringify(MOCK_ROOM_STATE));

    setTimeout(() => {
      console.log('소켓 연결됨');
      this.trigger('connect');
      this.trigger('gameState', this.roomState);
    }, 500);
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

  emit(event: string, ...args: any[]) {
    console.log(`Emit 진행: ${event}`, args);

    if (event === 'toggleReady') {
      const { userId } = args[0];
      const player = this.roomState.players.find((p) => p.userId === userId);
      if (player) {
        player.isReady = !player.isReady;
        const newState = JSON.parse(JSON.stringify(this.roomState));
        this.trigger('gameState', newState);
      }
    }

    if (event === 'kickUser') {
      const { targetId } = args[0];
      this.roomState.players = this.roomState.players.filter(
        (p) => p.userId !== targetId,
      );
      const newState = JSON.parse(JSON.stringify(this.roomState));
      this.trigger('gameState', newState);
    }

    if (event === 'sendChat') {
      const { message, userId } = args[0];

      const sender = this.roomState.players.find((p) => p.userId === userId);
      const nickname = sender ? sender.nickname : '알 수 없음';
      const level = sender ? sender.level : 0;
      const teamId = sender ? sender.teamId : null;

      const newMessage = {
        id: Date.now().toString(),
        senderId: userId,
        senderName: nickname,
        content: message,
        timestamp: new Date().toISOString(),
        level: level,
        teamId: teamId,
        type: 'USER', // 'SYSTEM'이면 시스템 메시지
      };

      console.log(`[Mock Chat] ${nickname}: ${message}`);

      this.trigger('chatMessage', newMessage);
    }
  }

  private trigger(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((cb) => cb(...args));
    }
  }
}
