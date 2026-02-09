import type { RefObject } from 'react';

import { cn } from '@/shared/lib';
import type { ChatMessage } from '@/shared/model';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  messages: ChatMessage[];
  messageListRef: RefObject<HTMLDivElement | null>;
  className?: string;
  currentUserId?: string;
  showChannelTag?: boolean;
}

export const MessageList = ({
  messages,
  messageListRef,
  className,
  currentUserId,
  showChannelTag,
}: MessageListProps) => {
  const isEmpty = messages.length === 0;
  return (
    <div
      ref={messageListRef}
      className={cn(
        'flex flex-col gap-1 overflow-y-auto pr-2 text-sm leading-tight',
        'scrollbar-thin scrollbar-thumb-[#D3D3D3] scrollbar-track-transparent',
        className,
      )}
    >
      {isEmpty ? (
        <p className="text-[20px] text-gray-400">메세지를 보내주세요!</p>
      ) : (
        messages.map((msg) => (
          <MessageItem
            key={msg.id}
            msg={msg}
            currentUserId={currentUserId}
            showChannelTag={showChannelTag}
          />
        ))
      )}
    </div>
  );
};
