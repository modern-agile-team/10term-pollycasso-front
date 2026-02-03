import { useEffect, useRef, useState } from 'react';

import {
  isAtOnly,
  isEmptyOrAt,
  parseWhisper,
} from '@/entities/chat/lib/mention.lib';
import { useAuthStore } from '@/entities/user';
import { mockChannels, mockFriends } from '@/mocks/chat.mock';
import type { ChatMessage, Friend } from '@/shared/model';
import { useChatSocket } from '@/shared/api/socket/ChatSocketProvider';

export const useMainChat = () => {
  const { chatSocket, isChatConnected } = useChatSocket();

  const user = useAuthStore((state) => state.user);
  const currentUserId = user?.id;

  const [input, setInput] = useState('');
  const [selected, setSelected] = useState(mockChannels[0]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isMentionOpen, setIsMentionOpen] = useState(false);
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>(mockFriends);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isComposing, setIsComposing] = useState(false);

  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chatSocket) return;

    const handleLobbyMessage = (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    chatSocket.on('lobby:message', handleLobbyMessage);

    return () => {
      chatSocket.off('lobby:message', handleLobbyMessage);
    };
  }, [chatSocket]);

  useEffect(() => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleMentionOpen = (value: string) => {
    setInput(value);

    if (!value.startsWith('@')) {
      setIsMentionOpen(false);

      if (selected.value === 'direct') {
        const globalChannel = mockChannels.find((c) => c.value === 'global');
        if (globalChannel) setSelected(globalChannel);
      }
      return;
    }

    if (value.includes(' ')) {
      setIsMentionOpen(false);
      return;
    }

    const mentionCandidate = value.slice(1);

    if (mentionCandidate === '') {
      setFilteredFriends(mockFriends);
      setIsMentionOpen(true);
      setHighlightIndex(0);

      const directChannel = mockChannels.find((c) => c.value === 'direct');
      if (directChannel) setSelected(directChannel);
      return;
    }

    const valid = /^[a-zA-Z0-9가-힣]+$/.test(mentionCandidate);
    if (!valid) {
      setIsMentionOpen(false);
      return;
    }

    const filtered = mockFriends.filter((f) =>
      f.name.toLowerCase().startsWith(mentionCandidate.toLowerCase()),
    );

    setFilteredFriends(filtered);
    setIsMentionOpen(filtered.length > 0);
  };

  const handleMentionSelect = (friend: Friend) => {
    setIsMentionOpen(false);
    setInput(`@[${friend.name}](${friend.id}) `);
    setSelected(mockChannels[1]);
    setHighlightIndex(0);
  };

  const selectChannel = (value: string) => {
    const ch = mockChannels.find((c) => c.value === value);
    if (!ch) return;

    setSelected(ch);

    if (ch.value === 'direct' && !input.startsWith('@')) {
      setInput('@');
      setIsMentionOpen(true);
      setFilteredFriends(mockFriends);
      setHighlightIndex(0);
    } else {
      setIsMentionOpen(false);
    }
  };

  const onChannelToggle = () => setIsChannelDropdownOpen((p) => !p);

  const handleSelectChannel = (value: string) => {
    selectChannel(value);
    setIsChannelDropdownOpen(false);
  };

  const sendMessage = () => {
    if (!user || !chatSocket) return;

    const trimmed = input.trim();
    if (isEmptyOrAt(trimmed)) return;

    const whisperData = parseWhisper(trimmed);
    const isDirectChannel = selected.value === 'direct';

    if (isDirectChannel && whisperData) {
      chatSocket.emit('lobby:send', {
        channel: 'direct',
        message: whisperData.message,
        targetId: Number(whisperData.targetId),
      });
    } else {
      if (isAtOnly(trimmed)) return;

      chatSocket.emit('lobby:send', {
        channel: 'global',
        message: trimmed,
      });
    }

    resetInputStatus();
  };

  const resetInputStatus = () => {
    setInput('');
    setIsMentionOpen(false);
    setHighlightIndex(0);
  };

  const handleKeyDown = (e: any) => {
    if (e.nativeEvent.isComposing) return;

    if (isMentionOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev + 1 < filteredFriends.length ? prev + 1 : 0,
        );
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev - 1 >= 0 ? prev - 1 : filteredFriends.length - 1,
        );
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const friend = filteredFriends[highlightIndex];
        if (friend) handleMentionSelect(friend);
        return;
      }
    }

    if (!isMentionOpen && e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  return {
    messages,
    input,
    selected,
    filteredFriends,
    highlightIndex,
    isMentionOpen,
    isChannelDropdownOpen,
    messagesEndRef,
    currentUserId,
    setInput,
    setSelected,
    setIsComposing,
    setIsMentionOpen,
    setHighlightIndex,
    setFilteredFriends,
    handleMentionOpen,
    handleMentionSelect,
    handleKeyDown,
    sendMessage,
    selectChannel,
    onChannelToggle,
    handleSelectChannel,
  };
};
