import { useEffect } from 'react';
import { BellAlertIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Title } from '@/assets';

interface NudgeModalProps {
  close: () => void;
  onConfirm?: () => void;
}

export const NudgeModal = ({ close, onConfirm }: NudgeModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      onClick={close}
      className="fixed inset-0 flex justify-center items-center bg-black/70 z-50 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#E8E8E8] w-[700px] p-8 rounded-xl shadow-2xl flex flex-col items-center gap-6 animate-in zoom-in-95 duration-200 font-ssrm cursor-default"
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 bg-gray-300 rounded-md p-1 hover:bg-gray-400 transition-colors"
        >
          <XMarkIcon className="w-7 h-7 text-white" />
        </button>

        <img src={Title} alt="Title" className="w-[450px] mt-6" />

        <div className="bg-white flex justify-center items-center w-[500px] h-[225px] text-4xl rounded-xl shadow-inner">
          <div className="flex flex-col items-center gap-3">
            <BellAlertIcon className="w-12 h-12 mb-2 text-yellow-300 animate-bounce" />
            <span>이런! 친구가 불러요!</span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-y-3 text-white w-full">
          <button
            onClick={() => {
              onConfirm?.();
              close();
            }}
            className="w-[500px] h-[75px] text-3xl bg-[#2ADB75] rounded-2xl hover:bg-[#25C468] transition-colors shadow-md"
          >
            대기실 페이지로 돌아가기
          </button>

          <button
            onClick={close}
            className="w-[500px] h-[75px] text-3xl bg-[#2D2D2D] rounded-2xl hover:bg-black transition-colors"
          >
            더 구경하기
          </button>
        </div>
      </div>
    </div>
  );
};
