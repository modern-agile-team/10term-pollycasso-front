import { useGameChat } from '../model/useGameChat';
import { ChatInput } from './ChatInput';
import { ChatSendButton } from './ChatSendButton';
import { MessageList } from './MessageList';

export const GameChat = () => {
  const { state, actions, messagesEndRef } = useGameChat();

  return (
    <div className="flex flex-col w-full h-full bg-white/40 rounded-2xl overflow-hidden border border-white/5">
      <MessageList
        messages={state.messages}
        messagesEndRef={messagesEndRef}
        className="flex-1 p-4 h-full text-white"
        currentUserId={state.myUserId}
      />

      <div className="flex gap-2 items-center border-t border-white/10">
        <div className="flex-1 bg-white rounded-xl overflow-hidden h-12 flex items-center">
          <ChatInput
            value={state.input}
            onChange={actions.setInput}
            onKeyDown={actions.handleKeyDown}
            setIsComposing={actions.setIsComposing}
            placeholder="채팅 입력..."
            className="w-full text-base text-black placeholder-gray-500"
          />
          <ChatSendButton
            disabled={!state.input.trim()}
            onSend={actions.handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};
