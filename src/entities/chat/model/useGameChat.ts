import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/entities/user';
import { useWaitingSocket } from '@/shared/api/socket/WaitingSocketProvider';
import type { ChatMessage } from '@/shared/model';

export const useGameChat = () => {
  const { waitingSocket } = useWaitingSocket();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const messageListRef = useRef<HTMLDivElement>(null);
  const MY_USER_ID = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    if (!waitingSocket) return;

    const handleNewMessage = (newMsg: ChatMessage) => {
      setMessages((prev) => [...prev, newMsg]);
    };

    const handleSystemMessage = (sysMsg: ChatMessage) => {
      setMessages((prev) => [...prev, { ...sysMsg, channel: 'system' }]);
    };

    waitingSocket.on('room:message', handleNewMessage);
    waitingSocket.on('chat:systemMessage', handleSystemMessage);

    return () => {
      waitingSocket.off('room:message', handleNewMessage);
      waitingSocket.off('chat:systemMessage', handleSystemMessage);
    };
  }, [waitingSocket]);

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim() || !waitingSocket) return;

    waitingSocket.emit('room:send', {
      channel: 'global',
      message: input.trim(),
    });

    setInput('');
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    messageListRef,
    state: {
      messages,
      input,
      myUserId: MY_USER_ID,
    },
    actions: {
      setInput,
      handleSendMessage,
      handleKeyDown,
    },
  };
};
