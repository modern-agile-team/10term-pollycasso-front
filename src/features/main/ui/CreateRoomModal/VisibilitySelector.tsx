import { cn } from '@/shared/lib/cn';

interface VisibilitySelectorProps {
  visibility: 'public' | 'private' | null;
  selectVisibility: (v: 'public' | 'private') => void;
}

export const VisibilitySelector = ({
  visibility,
  selectVisibility,
}: VisibilitySelectorProps) => {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-[#6EE035] text-white font-bold rounded-t-xl px-6 py-3">
        공개설정
      </span>

      <div className="mt-3 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => selectVisibility('public')}
          className={cn(
            'border-2 rounded-xl py-3 px-8 font-bold bg-white',
            visibility === 'public'
              ? 'border-[#027DFF] text-[#027DFF]'
              : 'border-transparent text-black',
          )}
        >
          공개
        </button>

        <button
          type="button"
          onClick={() => selectVisibility('private')}
          className={cn(
            'border-2 rounded-xl py-3 px-8 font-bold bg-white',
            visibility === 'private'
              ? 'border-[#027DFF] text-[#027DFF]'
              : 'border-transparent text-black',
          )}
        >
          비공개
        </button>
      </div>

      <div className="w-[130px] h-[10px] rounded-b-full bg-[#6EE035] mt-2" />
    </div>
  );
};
