import { useMainChat } from '../model/useMainChat';
import { ChannelSelect } from './ChannelSelect';
import { ChatInput } from './ChatInput';
import { ChatSendButton } from './ChatSendButton';
import { MessageList } from './MessageList';

export const MainChat = () => {
  const {
    messages,
    input,
    selected,
    filteredFriends,
    messageListRef,
    handleMentionOpen,
    handleKeyDown,
    sendMessage,
    isChannelDropdownOpen,
    onChannelToggle,
    handleSelectChannel,
    currentUserId,
  } = useMainChat();

  const disableSend =
    input.trim() === '' || /^@[a-zA-Z0-9가-힣_]+$/.test(input.trim());

  return (
    <div className="relative mt-5 w-[1020px] h-[190px] rounded-b-2xl bg-white/70 border border-[#c0c8b0] shadow-sm p-4 flex flex-col justify-between">
      <MessageList
        messages={messages}
        messageListRef={messageListRef}
        currentUserId={currentUserId}
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
          friends={filteredFriends}
          className="w-4/5 mr-2 text-base text-black placeholder-gray-500"
        />

        <ChatSendButton disabled={disableSend} onSend={sendMessage} />
      </div>
    </div>
  );
};
