import type { ChatMessage } from '@/shared/model';

interface MessageDisplayData {
  displayName: string;
  channelLabel: string | null;
  styleClass: string;
  isMe: boolean;
  isFriend: boolean;
  isSystem: boolean;
}

export const getMessageDisplayData = (
  msg: ChatMessage,
  currentUserId?: string,
  showChannelTag?: boolean,
): MessageDisplayData => {
  const isSystem = msg.channel === 'system';
  const isFriend = msg.channel === 'direct';
  const isMe = String(msg.senderId) === String(currentUserId);

  let styleClass = '';
  let channelLabel: string | null = null;
  let displayName = msg.nickname;

  if (isSystem) {
    styleClass = 'text-red-400 font-bold';
    channelLabel = '[시스템]';
  } else if (isFriend) {
    styleClass = 'text-[#305946] font-bold';
    channelLabel = '[친구]';
  } else {
    styleClass = isMe ? 'text-[#005299]' : 'text-black';
    channelLabel = showChannelTag ? '[전체]' : null;
  }

  if (!isSystem) {
    if (isFriend) {
      if (isMe) {
        displayName = `${msg.targetNickname || '상대방'}에게`;
      } else {
        displayName = `${msg.nickname}에게서`;
      }
    } else if (isMe) {
      displayName = '나';
    }
  }

  return { displayName, channelLabel, styleClass, isMe, isFriend, isSystem };
};

export const getSystemMessageText = (code: string): string => {
  switch (code) {
    case 'TARGET_OFFLINE':
      return '상대방이 접속 중이 아닙니다. 메시지를 보낼 수 없습니다.';
    case 'NOT_FRIENDS':
      return '친구 사이가 아니어서 귓속말을 보낼 수 없습니다.';
    case 'YOU_ARE_BLOCKED':
      return '상대방에게 차단당하여 메시지를 보낼 수 없습니다.';
    case 'TARGET_IS_BLOCKED':
      return '차단한 상대에게는 메시지를 보낼 수 없습니다.';
    case 'CANNOT_WHISPER_SELF':
      return '자기 자신에게는 귓속말을 보낼 수 없습니다.';
    case 'USER_NOT_FOUND':
      return '존재하지 않는 사용자입니다.';
    case 'FORBIDDEN_CHANNEL':
      return '입장할 수 없는 채널입니다.';
    case 'MESSAGE_SEND_FAILED':
      return '메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
    case 'INVALID_INPUT':
      return '잘못된 입력입니다.';
    default:
      return '알 수 없는 오류가 발생했습니다.';
  }
};
