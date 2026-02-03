import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Title } from '@/assets';

interface ModalProps {
  /** 모달 닫기 함수 (X버튼, 배경 클릭, 취소 버튼) */
  onClose: () => void;
  /** 긍정 버튼 클릭 시 실행될 함수 (확인, 입장하기 등) */
  onConfirm?: () => void;
  /** 긍정 버튼 텍스트 (기본값: 확인) */
  confirmText?: string;
  /** 부정 버튼 텍스트 (기본값: 취소) */
  cancelText?: string;
  /** 하얀 박스 안에 들어갈 컨텐츠 */
  children: ReactNode;
  /** 폼 태그 사용 여부 (true일 경우 긍정 버튼이 submit 타입이 됨) */
  isForm?: boolean;
}

export const Modal = ({
  onClose,
  onConfirm,
  confirmText = '확인!',
  cancelText = '취소',
  children,
  isForm = false,
}: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const Container = isForm ? 'form' : 'div';

  const handleSubmit = (e: React.FormEvent) => {
    if (isForm) {
      e.preventDefault();
      onConfirm?.();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/70 z-[10000] backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Container
        onSubmit={isForm ? handleSubmit : undefined}
        className="relative bg-[#E8E8E8] w-[700px] p-8 rounded-xl shadow-2xl flex flex-col items-center gap-6 animate-in zoom-in-95 duration-200 font-ssrm cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-300 rounded-md p-1 hover:bg-gray-400 transition-colors"
        >
          <XMarkIcon className="w-7 h-7 text-white" />
        </button>

        <img src={Title} alt="Title" className="w-[450px] mt-6" />

        <div className="bg-white flex flex-col justify-center items-center w-[500px] min-h-[225px] p-6 rounded-xl shadow-inner relative">
          {children}
        </div>

        <div className="flex flex-col justify-center items-center gap-y-3 text-white w-full mt-4">
          <button
            type={isForm ? 'submit' : 'button'}
            onClick={!isForm ? onConfirm : undefined}
            className="w-[500px] h-[75px] text-3xl bg-[#2ADB75] rounded-2xl hover:bg-[#25C468] transition-colors shadow-md font-bold flex items-center justify-center"
          >
            {confirmText}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-[500px] h-[75px] text-3xl bg-[#2D2D2D] rounded-2xl hover:bg-black transition-colors font-bold"
          >
            {cancelText}
          </button>
        </div>
      </Container>
    </div>,
    document.body,
  );
};
