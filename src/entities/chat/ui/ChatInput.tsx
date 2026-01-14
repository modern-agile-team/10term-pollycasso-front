import { Mention, MentionsInput } from 'react-mentions';

import { cn } from '@/shared/lib';
import type { Friend } from '@/shared/model';

const customStyle = {
  control: {
    backgroundColor: 'transparent',
    fontSize: 18,
    fontWeight: 'normal',
    width: '100%',
    lineHeight: '1.5',
    letterSpacing: 'normal',
  },

  '&singleLine': {
    display: 'inline-block',
    width: '100%',

    highlighter: {
      padding: '10px 12px',
      border: '2px solid transparent',
      margin: 0,
      color: 'transparent',
    },

    input: {
      padding: '10px 12px',
      border: '2px solid transparent',
      outline: 'none',
      margin: 0,
      color: 'black',
      caretColor: 'black',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      fontSize: 16,
      overflow: 'hidden',
      marginTop: 24,
      zIndex: 9999,
    },
    item: {
      padding: '8px 12px',
      '&focused': {
        backgroundColor: '#e5e7eb',
      },
    },
  },
};

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: any) => void;
  friends: Friend[];
  className?: string;
  placeholder?: string;
}

export const ChatInput = ({
  value,
  onChange,
  onKeyDown,
  friends = [],
  className,
  placeholder = '메세지를 보내주세요!',
}: ChatInputProps) => {
  return (
    <div className={cn('h-full w-full flex items-center', className)}>
      <MentionsInput
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        singleLine={true}
        style={customStyle}
        className="w-full h-full outline-none bg-transparent font-ssrm"
        a11ySuggestionsListLabel="친구 멘션"
      >
        <Mention
          trigger="@"
          markup="@[__display__](__id__)"
          displayTransform={(display) => `@${display}`}
          data={friends.map((f) => ({ id: String(f.id), display: f.name }))}
          className="bg-[#2ADB75]/40 rounded-md ml-0.5"
          appendSpaceOnAdd={true}
          renderSuggestion={(suggestion) => (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-800">{suggestion.display}</span>
            </div>
          )}
        />
      </MentionsInput>
    </div>
  );
};
