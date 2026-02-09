import type { RoomState, RoomStatus } from '@/shared/model';

export interface UpdateGameStatePayload {
  phase: RoomStatus;
  endsAt: number | null;
  phaseContext: RoomState['phaseContext'];
}
