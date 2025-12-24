import type { ManagerOptions, SocketOptions } from 'socket.io-client';
import { io as realIo, Socket as RealSocket } from 'socket.io-client';

import { MockSocket } from './mockSocket';

export type Socket = RealSocket;

export const io = (
  uri: string,
  opts?: Partial<ManagerOptions & SocketOptions>,
): RealSocket => {
  const useMock = import.meta.env.VITE_USE_MOCK === 'true';

  if (useMock) {
    return new MockSocket() as unknown as RealSocket;
  }

  return realIo(uri, opts);
};
