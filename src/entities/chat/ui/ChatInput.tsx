import type { ComponentProps } from 'react';
import type { SuggestionDataItem } from 'react-mentions';
import { Mention, MentionsInput } from 'react-mentions';

import { cn } from '@/shared/lib';
import type { Friend } from '@/shared/model';
import { mapFriendsToSuggestions, MENTION_STYLE } from './chatInput.styles';

// HTML input 대신 라이브러리 컴포넌트의 타입을 상속받아
// onKeyDown의 타입 불일치 문제 방지합니다.
interface ChatInputProps
  extends Omit<ComponentProps<typeof MentionsInput>, 'value' | 'onChange'> {
  value: string;
  onChange: (v: string) => void;
  friends: Friend[];
}

export const ChatInput = ({
  value,
  friends = [],
  onChange,
  onKeyDown,
  className,
  placeholder = '메세지를 보내주세요!',
  ...props
}: ChatInputProps) => {
  const shouldShowSuggestions = value.startsWith('@') && !value.includes(' ');
  const suggestionData = shouldShowSuggestions
    ? mapFriendsToSuggestions(friends)
    : [];

  const renderSuggestion = (suggestion: SuggestionDataItem) => (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-green-500 rounded-full" />
      <span className="text-gray-800">{suggestion.display}</span>
    </div>
  );

  return (
    <div className={cn('h-full w-full flex items-center', className)}>
      <MentionsInput
        {...props}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        singleLine={true}
        style={MENTION_STYLE}
        className="w-full h-full outline-none bg-transparent font-ssrm"
        a11ySuggestionsListLabel="친구 멘션"
      >
        <Mention
          trigger="@"
          // 실제 데이터 저장 포맷 (화면엔 @이름, 내부값은 @[이름](id) 형태로 저장)
          markup="@[__display__](__id__)"
          displayTransform={(_id, display) => `@${display}`}
          data={suggestionData}
          className="bg-[#2ADB75]/40 rounded-md ml-0.5"
          appendSpaceOnAdd={true}
          renderSuggestion={renderSuggestion}
        />
      </MentionsInput>
    </div>
  );
};
