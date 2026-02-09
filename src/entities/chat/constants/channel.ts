import type { ChannelType, ChatChannel } from '../model/types';

export const CHANNEL_TYPES: Record<string, ChannelType> = {
  GLOBAL: 'global',
  DIRECT: 'direct',
  SYSTEM: 'system',
} as const;

export const CHAT_CHANNELS: readonly ChatChannel[] = [
  { value: CHANNEL_TYPES.GLOBAL, label: '전체' },
  { value: CHANNEL_TYPES.DIRECT, label: '친구' },
  { value: CHANNEL_TYPES.SYSTEM, label: '안내' },
];

export const DEFAULT_CHANNEL = CHAT_CHANNELS[0];
