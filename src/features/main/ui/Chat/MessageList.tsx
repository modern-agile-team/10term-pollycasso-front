import type { ChatMessage } from '@/entities/chat';

interface MessageListProps {
  messages: ChatMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const MessageList = ({ messages, messagesEndRef }: MessageListProps) => {
  return (
    <div
      ref={messagesEndRef}
      className="flex h-[120px] flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#D3D3D3] scrollbar-track-transparent pr-2 text-sm leading-tight"
    >
      {messages.length === 0 ? (
        <p className="text-[20px] text-gray-400">메세지를 보내주세요!</p>
      ) : (
        messages.map((msg, i) => {
          const isFriend = msg.channel === '친구';
          return (
            <p
              key={i}
              className={`text-base leading-tight px-1 rounded-md ${
                isFriend ? 'text-[#305946] font-bold' : 'text-black'
              }`}
            >
              {isFriend ? (
                <>
                  <span className="text-[20px]">
                    [친구] {msg.targetNickname}에게 :
                  </span>
                  <span className="text-[20px]"> {msg.text}</span>
                </>
              ) : (
                <>
                  <span className="font-bold text-[20px] mr-1">[전체]</span>
                  <span className="text-[20px]">당신 : </span>
                  <span className="text-[20px]">{msg.text}</span>
                </>
              )}
            </p>
          );
        })
      )}
    </div>
  );
};
