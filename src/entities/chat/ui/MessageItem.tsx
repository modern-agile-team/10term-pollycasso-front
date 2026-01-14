import { cn } from '@/shared/lib';
import type { ChatMessage } from '@/shared/model';
import { getMessageDisplayData } from '../lib/message.lib';

interface MessageItemProps {
  msg: ChatMessage;
  currentUserId?: string;
  showChannelTag?: boolean;
}

export const MessageItem = ({
  msg,
  currentUserId,
  showChannelTag,
}: MessageItemProps) => {
  const { displayName, channelLabel, styleClass, isMe, isFriend } =
    getMessageDisplayData(msg, currentUserId, showChannelTag);

  const containerBase =
    'text-base leading-tight px-1 rounded-md mb-1 text-[20px]';

  return (
    <p className={cn(containerBase, styleClass)}>
      {channelLabel && (
        <span className={cn('mr-1', { 'font-bold': !isFriend })}>
          {channelLabel}
        </span>
      )}

      <span className={cn({ 'font-bold': isMe || isFriend })}>
        {displayName} :{' '}
      </span>

      <span>{msg.message}</span>
    </p>
  );
};
