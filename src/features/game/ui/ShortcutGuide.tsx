import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export const ShortcutGuide = () => {
  return (
    <div className="group relative inline-block">
      <button className="p-2 text-white transition-colors bg-gray-400 rounded-full shadow-sm border border-gray-100">
        <QuestionMarkCircleIcon className="w-6 h-6" />
      </button>

      <div className="absolute top-0 left-full ml-3 w-64 p-4 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
        <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">
          키보드 단축키
        </h3>

        <div className="space-y-4 text-sm text-gray-700">
          <section>
            <p className="font-semibold mb-2 text-gray-500 text-xs uppercase tracking-wider">
              도구 선택
            </p>
            <div className="grid grid-cols-2 gap-y-1.5">
              <KbdItem kbd="1" desc="연필" />
              <KbdItem kbd="2" desc="브러시" />
              <KbdItem kbd="3" desc="네온" />
              <KbdItem kbd="4" desc="채우기" />
              <KbdItem kbd="5" desc="지우개" />
            </div>
          </section>

          <section>
            <p className="font-semibold mb-2 text-gray-500 text-xs uppercase tracking-wider">
              브러시 설정
            </p>
            <KbdItem kbd="[ , ]" desc="크기 확대/축소" />
          </section>

          <section>
            <p className="font-semibold mb-2 text-gray-500 text-xs uppercase tracking-wider">
              작업 기록
            </p>
            <div className="space-y-1.5">
              <KbdItem kbd="Ctrl + Z" desc="실행 취소" />
              <KbdItem kbd="Ctrl + Shift + Z" desc="다시 실행" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const KbdItem = ({ kbd, desc }: { kbd: string; desc: string }) => (
  <div className="flex items-center justify-between pr-4">
    <span className="text-gray-600">{desc}</span>
    <kbd className="px-3 py-1 bg-gray-100 border-b-2 border-gray-300 rounded text-[11px] font-sans font-bold text-gray-800 min-w-[24px] text-center">
      {kbd}
    </kbd>
  </div>
);
