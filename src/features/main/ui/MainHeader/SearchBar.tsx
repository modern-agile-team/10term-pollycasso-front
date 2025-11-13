import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
}

export const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  return (
    <div className="flex w-[480px]">
      <input
        className="w-full border-none outline-none px-4 rounded-l-xl bg-white font-ssrn font-normal text-[20px] placeholder-gray-300"
        placeholder="방 번호나 제목으로 검색하세요..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSearch();
          }
        }}
      />
      <button
        className="px-3 py-[10px] bg-gray-300 hover:opacity-90 transition rounded-r-xl"
        onClick={onSearch}
      >
        <MagnifyingGlassIcon className="w-6 h-6" />
      </button>
    </div>
  );
};
