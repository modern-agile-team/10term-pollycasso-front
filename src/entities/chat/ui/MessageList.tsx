import type { RefObject } from 'react';
import type { ChatMessage } from '@/entities/chat/model';
import clsx from 'clsx';
import { MessageItem } from '@/entities/chat/ui/MessageItem';

interface MessageListProps {
  messages: ChatMessage[];
  messagesEndRef: RefObject<HTMLDivElement | null>;
  className?: string;
  currentUserId?: string;
  showChannelTag?: boolean;
}

export const MessageList = ({
  messages,
  messagesEndRef,
  className,
  currentUserId,
  showChannelTag,
}: MessageListProps) => {
  const isEmpty = messages.length === 0;
  return (
    <div
      ref={messagesEndRef}
      className={clsx(
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
