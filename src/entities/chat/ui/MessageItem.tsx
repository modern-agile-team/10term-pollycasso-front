import { cn } from '@/shared/lib';
import type { ChatMessage } from '@/shared/model';

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
  const isFriend = msg.channel === '친구';
  const isMe = msg.senderId === currentUserId;

  const showTag = showChannelTag && !isFriend;

  const containerClassName = cn(
    'text-base leading-tight px-1 rounded-md mb-1',
    {
      'text-[#305946] font-bold': isFriend,
      'text-[#005299]': !isFriend && isMe,
      'text-black': !isFriend && !isMe,
    },
  );

  if (isFriend) {
    return (
      <p className={containerClassName}>
        <span className="text-[20px]">[친구] {msg.targetNickname}에게 : </span>
        <span className="text-[20px]">{msg.message}</span>
      </p>
    );
  }

  return (
    <p className={containerClassName}>
      {showTag && <span className="font-bold text-[20px] mr-1">[전체]</span>}
      <span className={cn('text-[20px]', { 'font-bold': isMe })}>
        {isMe ? '나' : msg.nickname} :{' '}
      </span>
      <span className="text-[20px]">{msg.message}</span>
    </p>
  );
};
