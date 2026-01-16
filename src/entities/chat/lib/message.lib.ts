import type { ChatMessage } from '@/shared/model';

interface MessageDisplayData {
  displayName: string;
  channelLabel: string | null;
  styleClass: string;
  isMe: boolean;
  isFriend: boolean;
}

export const getMessageDisplayData = (
  msg: ChatMessage,
  currentUserId?: string,
  showChannelTag?: boolean,
): MessageDisplayData => {
  const isFriend = msg.channel === '친구';
  const isMe = String(msg.senderId) === String(currentUserId);

  let styleClass = '';
  if (isFriend) {
    styleClass = 'text-[#305946] font-bold';
  } else {
    styleClass = isMe ? 'text-[#005299]' : 'text-black';
  }

  const channelLabel = isFriend ? '[친구]' : showChannelTag ? '[전체]' : null;

  let displayName = msg.nickname;
  if (isFriend) {
    if (isMe) {
      displayName = `${msg.targetNickname || '상대방'}에게`;
    } else {
      displayName = `${msg.nickname}에게서`;
    }
  } else if (isMe) {
    displayName = '나';
  }

  return { displayName, channelLabel, styleClass, isMe, isFriend };
};
