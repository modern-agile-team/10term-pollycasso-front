interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setIsComposing: (v: boolean) => void;
}

export const ChatInput = ({
  value,
  onChange,
  onKeyDown,
  setIsComposing,
}: ChatInputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
      maxLength={50}
      className="flex-1 px-3 text-lg outline-none h-full"
      placeholder="메세지 입력…"
    />
  );
};
