import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/entities/user';
import { mockChannels, mockFriends } from '@/mocks/chat.mock';
import { useSocket } from '@/shared/api/socket';
import type { Friend } from '@/shared/model';

export const useMainChat = () => {
  const { messages, sendMessage: emitMessage } = useSocket();

  const [input, setInput] = useState('');
  const [selected, setSelected] = useState(mockChannels[0]);

  const [isMentionOpen, setIsMentionOpen] = useState(false);
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>(mockFriends);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isComposing, setIsComposing] = useState(false);

  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false);

  const userId = useAuthStore((state) => state.user?.id);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleMentionOpen = (value: string) => {
    setInput(value);

    const lastAtIndex = value.lastIndexOf('@');
    if (lastAtIndex === -1) {
      setIsMentionOpen(false);
      setSelected(mockChannels[0]);
      return;
    }

    const mentionCandidate = value.slice(lastAtIndex + 1);

    if (mentionCandidate === '') {
      setFilteredFriends(mockFriends);
      setIsMentionOpen(true);
      setHighlightIndex(0);
      setSelected(mockChannels[1]);
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

    if (filtered.length > 0) setSelected(mockChannels[1]);
  };

  const handleMentionSelect = (friend: Friend) => {
    setIsMentionOpen(false);
    setInput(`@${friend.name} `);
    setSelected(mockChannels[1]);
    setHighlightIndex(0);
  };

  const selectChannel = (value: string) => {
    const ch = mockChannels.find((c) => c.value === value);
    if (!ch) return;

    setSelected(ch);

    if (ch.value === '친구' && !input.startsWith('@')) {
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
    const trimmed = input.trim();
    if (trimmed === '' || /^@\S+$/.test(trimmed)) return;

    emitMessage(trimmed);

    setInput('');
    setIsMentionOpen(false);
    setHighlightIndex(0);
  };

  const handleKeyDown = (e: any) => {
    if (isComposing) return;

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
      e.preventDefault();
      sendMessage();
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
    userId,
  };
};
