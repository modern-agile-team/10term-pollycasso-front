import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/entities/user';
import { useSocket } from '@/shared/api/socket';
import type { ChatMessage } from '@/shared/model';

export const useGameChat = () => {
  const { socket } = useSocket();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const MY_USER_ID = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMsg: ChatMessage) => {
      setMessages((prev) => [...prev, newMsg]);
    };

    socket.on('chat:newMessage', handleNewMessage);

    return () => {
      socket.off('chat:newMessage', handleNewMessage);
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim() || !socket) return;

    socket.emit('chat:sendMessage', {
      userId: MY_USER_ID,
      message: input,
    });

    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    messagesEndRef,
    state: {
      messages,
      input,
      myUserId: MY_USER_ID,
    },
    actions: {
      setInput,
      setIsComposing,
      handleSendMessage,
      handleKeyDown,
    },
  };
};
