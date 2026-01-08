import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { BellIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid';

const FreindPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 md:p-12 font-ssrm font-bold ">
      <div className="w-full max-w-[1500px] min-w-[768px] h-[760px] flex flex-col rounded-3xl bg-[#1E3411]/40 overflow-hidden px-5">
        <div className="flex items-center justify-between pl-4 pr-11 pt-10 w-full">
          {/* 왼쪽: 타이틀 */}
          <span className="mb-10 text-white text-5xl font-bold tracking-tight">
            친구
          </span>

          {/* 오른쪽: 버튼 및 검색창 그룹 */}
          <div className="flex items-center gap-x-2">
            {/* 1. 알림 버튼 (반투명 원형 테두리) */}
            <button className="flex items-center justify-center w-11 h-11 rounded-full bg-white/30 border-4 border-white/5 hover:bg-white/20 transition-all">
              <BellIcon className="w-8 h-8 text-white" />
            </button>

            <div className="p-1.5 mr-4 rounded-[20px] bg-white/10 border border-white/10">
              <button className="px-6 py-1 rounded-[14px] bg-[#2ADB75] hover:bg-[#52c97a] text-white text-2xl font-bold shadow-[0_0_20px_rgba(99,230,141,0.3)] transition-all">
                친구추가
              </button>
            </div>

            <div className="flex items-center w-[450px] h-12 bg-white rounded-2xl overflow-hidden shadow-xl">
              <input
                type="text"
                placeholder="태그나 이름을 입력해주세요."
                className="flex-1 px-4 text-gray-500 text-xl outline-none placeholder:text-gray-300 font-medium"
              />
              <div className="flex items-center justify-center w-16 h-full bg-[#F0F0F0] border-l border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">
                <MagnifyingGlassIcon className="w-7 h-7 text-gray-800" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-5 pb-10 overflow-y-auto custom-scrollbar">
          {/* Grid 설정: 큰 화면(1536px~)에서는 4개씩 보이도록 확장 고려 */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex justify-between p-4 p-5 h-24 lg:h-28 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-x-3 lg:gap-x-4 overflow-hidden">
                <div className="shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gray-200" />
                <div className="flex flex-col justify-center h-full py-1 overflow-hidden">
                  <span className="text-xl lg:text-2xl font-bold truncate pr-2">
                    닉네임이엄청길다면어떡하지
                  </span>

                  <div className="flex items-center gap-x-2 mt-1">
                    <span className="px-2 lg:px-3 py-0.5 bg-green-400 text-sm lg:text-lg text-white rounded text-center">
                      1234
                    </span>
                    <span className="text-lg lg:text-xl text-green-500 truncate">
                      게임 중
                    </span>
                  </div>
                </div>
              </div>

              <button className="shrink-0 self-start mt-1 ml-1">
                <EllipsisVerticalIcon className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400 hover:text-gray-600 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreindPage;
