import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

import {
  isEmptyOrAt,
  parseWhisper,
  isAtOnly,
} from '@/entities/chat/lib/mention.lib';
import {
  CHANNEL_TYPES,
  CHAT_CHANNELS,
  DEFAULT_CHANNEL,
  type ChatChannel,
} from '@/entities/chat';
import { useFriendStore } from '@/entities/friend';
import type { FriendProfile } from '@/entities/friend';
import { useAuthStore } from '@/entities/user';
import { useChatSocket } from '@/shared/api/socket/ChatSocketProvider';
import { useFriendSocket } from '@/shared/api/socket/FriendSocketProvider';
import type { ChatMessage, Friend } from '@/shared/model';
import { getSystemMessageText } from '../lib/message.lib';

export const useMainChat = () => {
  const { chatSocket } = useChatSocket();
  const { friendSocket } = useFriendSocket();
  const user = useAuthStore((state) => state.user);
  const currentUserId = user?.id;

  const {
    friends: realFriends,
    initListeners: initFriendListeners,
    setFriends,
  } = useFriendStore();

  const [input, setInput] = useState('');
  const [selected, setSelected] = useState<ChatChannel>(DEFAULT_CHANNEL);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]);

  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false);
  const messageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chatSocket) return;

    const handleLobbyMessage = (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleSystemNotification = (error: {
      code: string;
      message?: string;
    }) => {
      const systemText = getSystemMessageText(error.code);
      const systemMessage: ChatMessage = {
        id: `sys-${Date.now()}-${Math.random()}`,
        senderId: 'system',
        nickname: '안내',
        message: systemText,
        channel: 'system',
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, systemMessage]);
    };

    chatSocket.on('lobby:message', handleLobbyMessage);
    chatSocket.on('system:notification', handleSystemNotification);

    return () => {
      chatSocket.off('lobby:message', handleLobbyMessage);
      chatSocket.off('system:notification', handleSystemNotification);
    };
  }, [chatSocket]);

  useEffect(() => {
    if (!friendSocket) return;

    // 멘션 대상을 찾기 위해 친구 소켓 연결
    initFriendListeners(friendSocket);

    // 친구 소켓을 통해 친구 목록 요청
    // 타입은 친구 도메인의 타입을 사용...
    friendSocket.emit('friends:getList', (response: FriendProfile[]) => {
      if (Array.isArray(response)) {
        setFriends(response);
      }
    });
  }, [friendSocket, initFriendListeners, setFriends]);

  const handleMentionOpen = (value: string) => {
    setInput(value);

    if (!value.startsWith('@') || value.includes(' ')) {
      // 멘션 모드 해제 시 채널 처리
      if (selected.value === CHANNEL_TYPES.DIRECT && !value.startsWith('@')) {
        const globalChannel = CHAT_CHANNELS.find(
          (c) => c.value === CHANNEL_TYPES.GLOBAL,
        );
        if (globalChannel) setSelected(globalChannel);
      }
      setFilteredFriends([]);
      return;
    }

    const mentionCandidate = value.slice(1);

    // @만 쳤을 때 전체 목록 보여주기, 귓속말 채널 자동 선택
    if (mentionCandidate === '') {
      setFilteredFriends(realFriends || []);

      const directChannel = CHAT_CHANNELS.find(
        (c) => c.value === CHANNEL_TYPES.DIRECT,
      );
      if (directChannel && selected.value !== CHANNEL_TYPES.DIRECT) {
        setSelected(directChannel);
      }
      return;
    }

    const filtered = (realFriends || []).filter((friend) =>
      friend.nickname.toLowerCase().startsWith(mentionCandidate.toLowerCase()),
    );

    setFilteredFriends(filtered);
  };

  const handleSelectChannel = (value: string) => {
    const ch = CHAT_CHANNELS.find((channel) => channel.value === value);
    if (!ch) return;

    setSelected(ch);
    setIsChannelDropdownOpen(false);

    if (ch.value === CHANNEL_TYPES.DIRECT && !input.startsWith('@')) {
      setInput('@');
      setFilteredFriends(realFriends || []);
    }
  };

  const sendMessage = () => {
    if (!user || !chatSocket) return;

    const trimmed = input.trim();
    if (isEmptyOrAt(trimmed)) return;

    const whisperData = parseWhisper(trimmed);
    const isDirectChannel = selected.value === CHANNEL_TYPES.DIRECT;

    if (isDirectChannel && whisperData) {
      chatSocket.emit('lobby:send', {
        channel: CHANNEL_TYPES.DIRECT,
        message: whisperData.message,
        targetId: Number(whisperData.targetId),
      });
    } else {
      if (isAtOnly(trimmed)) return;

      chatSocket.emit('lobby:send', {
        channel: CHANNEL_TYPES.GLOBAL,
        message: trimmed,
      });
    }

    setInput('');
    setFilteredFriends([]);
  };

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const onChannelToggle = () => setIsChannelDropdownOpen((p) => !p);

  return {
    messages,
    input,
    selected,
    filteredFriends,
    messageListRef,
    currentUserId,
    handleMentionOpen,
    handleKeyDown,
    sendMessage,
    onChannelToggle,
    handleSelectChannel,
    isChannelDropdownOpen,
  };
};
