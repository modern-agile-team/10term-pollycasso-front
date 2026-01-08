import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

export const FriendList = () => {
  return (
    <div className="flex-1 px-5 pb-10 overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex justify-between p-4 h-24 lg:h-28 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-x-3 lg:gap-x-4 overflow-hidden">
            <div className="shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gray-200" />
            <div className="flex flex-col justify-center h-full py-1 overflow-hidden">
              <span className="text-xl lg:text-2xl font-bold truncate pr-2">
                엄청나게긴닉네임입니다
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
  );
};
