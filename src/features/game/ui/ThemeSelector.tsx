import { THEME_STYLES, UI_TEXT } from '../constants/game';

interface ThemeSelectorProps {
  isSelector: boolean;
  inputValue: string;
  onChange: (value: string) => void;
  onRandom?: () => void;
}

export const ThemeSelector = ({
  isSelector,
  inputValue,
  onChange,
  onRandom,
}: ThemeSelectorProps) => {
  const placeholderText = isSelector
    ? UI_TEXT.PLACEHOLDER.DEFAULT
    : UI_TEXT.PLACEHOLDER.WAITING;

  const inputCursorStyle = !isSelector ? 'cursor-default' : '';

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-3xl">
      <div
        className="w-full p-1 rounded-3xl shadow-lg"
        style={{ background: THEME_STYLES.RAINBOW_GRADIENT }}
      >
        <div className="w-full h-32 bg-[#EEEEEE] rounded-[20px] flex items-center px-10 relative">
          <span className="text-4xl font-extrabold text-[#333333] mr-6 font-ssrm shrink-0">
            {UI_TEXT.THEME_PREFIX}
          </span>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => isSelector && onChange(e.target.value)}
            readOnly={!isSelector}
            placeholder={placeholderText}
            className={`w-full bg-transparent text-2xl font-bold text-[#555] outline-none placeholder:text-[#CCCCCC] font-ssrm ${inputCursorStyle}`}
            maxLength={20}
          />

          {isSelector && (
            <button
              onClick={onRandom}
              className="absolute right-4 top-4 bg-[#777777] hover:bg-[#666] text-white font-bold py-1.5 px-5 rounded-full text-xs transition-colors shadow-md"
            >
              RANDOM
            </button>
          )}
        </div>
      </div>

      <p className="w-full text-left pl-2 text-[#CCCCCC] font-bold text-lg font-ssrm">
        {isSelector ? UI_TEXT.HELPER.THEME_LIMIT : ' '}
      </p>
    </div>
  );
};
