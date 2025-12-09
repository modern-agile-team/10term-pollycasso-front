import { MessageList } from './MessageList';
import { useMainChat } from '@/entities/chat/model';
import { ChannelSelect } from './ChannelSelect';
import { ChatInput } from './ChatInput';
import { ChatSendButton } from './ChatSendButton';
import { MentionDropdown } from './MentionDropdown';

export const MainChat = () => {
  const {
    messages,
    input,
    selected,
    isMentionOpen,
    filteredFriends,
    highlightIndex,
    messagesEndRef,
    handleMentionOpen,
    handleMentionSelect,
    handleKeyDown,
    sendMessage,
    setIsComposing,
    isChannelDropdownOpen,
    onChannelToggle,
    handleSelectChannel,
    userId,
  } = useMainChat();

  const disableSend =
    input.trim() === '' || /^@[a-zA-Z0-9가-힣_]+$/.test(input.trim());

  return (
    <div className="relative mt-5 w-[1020px] h-[190px] rounded-b-2xl bg-white/70 border border-[#c0c8b0] shadow-sm p-4 flex flex-col justify-between">
      <MessageList
        messages={messages}
        messagesEndRef={messagesEndRef}
        currentUserId={userId}
        showChannelTag={true}
      />

      <div className="flex mt-2 border-2 border-black rounded-xl bg-white h-[55px]">
        <ChannelSelect
          selected={selected}
          isOpen={isChannelDropdownOpen}
          onToggle={onChannelToggle}
          onSelect={handleSelectChannel}
        />

        <ChatInput
          value={input}
          onChange={handleMentionOpen}
          onKeyDown={handleKeyDown}
          setIsComposing={setIsComposing}
          className="w-4/5 mr-2 text-base text-black placeholder-gray-500"
        />

        {isMentionOpen && (
          <MentionDropdown
            friends={filteredFriends}
            highlightIndex={highlightIndex}
            onSelect={handleMentionSelect}
          />
        )}

        <ChatSendButton disabled={disableSend} onSend={sendMessage} />
      </div>
    </div>
  );
};
