export type ChannelType = 'global' | 'direct' | 'system';

export interface ChatChannel {
  value: ChannelType;
  label: string;
}
