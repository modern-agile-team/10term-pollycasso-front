import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';

import { Title } from '@/assets';

interface AddFriendModalProps {
  onClose: () => void;
}

export const AddFriendModal = ({ onClose }: AddFriendModalProps) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
      <div className="relative bg-[#F2F2F2] w-[700px] p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-300 rounded-md p-1"
        >
          <XMarkIcon className="w-8 h-8 text-white" />
        </button>

        <img src={Title} alt="Title" className="w-[450px] my-10" />

        <div className="flex items-center my-3 w-[510px] h-12 bg-white rounded-2xl overflow-hidden">
          <input
            type="text"
            placeholder="친구의 태그나 이름을 입력해주세요."
            className="flex-1 px-4 text-gray-500 text-xl outline-none placeholder:text-[#BABABA] font-light"
          />
          <div className="flex items-center justify-center w-16 h-full bg-[#D9D9D9] border-l border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-700" />
          </div>
        </div>

        <div className="mt-3 w-[510px] flex flex-col font-bold">
          <div className="w-full rounded-t-2xl bg-[#153712] text-white text-xl px-4 py-1.5 font-light">
            추천친구
          </div>

          <div className="w-full h-[350px] overflow-y-auto bg-[#E2E2E2] custom-scrollbar">
            <div className="flex items-center justify-between p-4 bg-[#D9D9D9]/20">
              <div className="flex items-center gap-x-4 overflow-hidden">
                <div className="shrink-0 w-14 h-14 rounded-full bg-white" />

                <div className="flex items-center gap-x-2 min-w-0 pr-1">
                  <span className="text-xl text-black font-bold truncate max-w-[140px]">
                    하하하
                  </span>
                  <span className="shrink-0 px-1 bg-[#81D89B] text-lg text-white font-bold rounded tabular-nums">
                    2103
                  </span>
                  <span className="shrink-0 text-lg text-white font-bold drop-shadow-sm">
                    LV. 20
                  </span>
                  <div className="shrink-0 w-2.5 h-2.5 rounded-full bg-[#81D89B] ring-2 ring-white/50" />
                </div>
              </div>

              <button className="shrink-0 p-1">
                <PlusIcon className="w-6 h-6 text-white bg-black rounded-full p-0.5" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#D4D4D4]">
              <div className="flex items-center gap-x-4 overflow-hidden">
                <div className="shrink-0 w-14 h-14 rounded-full bg-white" />

                <div className="flex items-center gap-x-2 min-w-0 pr-1">
                  <span className="text-xl text-black font-bold truncate max-w-[200px]">
                    닉네임이엄청나게길어요
                  </span>
                  <span className="shrink-0 px-1 bg-[#81D89B] text-lg text-white font-bold rounded tabular-nums">
                    2103
                  </span>
                  <span className="shrink-0 text-lg text-white font-bold drop-shadow-sm">
                    LV. 5
                  </span>
                  <div className="shrink-0 w-2.5 h-2.5 rounded-full bg-[#81D89B] ring-2 ring-white/50" />
                </div>
              </div>

              <button className="shrink-0 p-1">
                <PlusIcon className="w-6 h-6 text-white bg-black rounded-full p-0.5" />
              </button>
            </div>
          </div>

          <div className="mb-8 w-full rounded-b-2xl bg-[#153712] h-3" />
        </div>
      </div>
    </div>
  );
};
