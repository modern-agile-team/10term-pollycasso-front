import { Modal } from '@/shared/ui/Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface KickModalProps {
  onConfirm: () => void;
}

export const KickModal = ({ onConfirm }: KickModalProps) => {
  return (
    <Modal
      onClose={onConfirm}
      onConfirm={onConfirm}
      confirmText="확인"
      cancelText="닫기"
    >
      <div className="flex flex-col items-center gap-6 py-4 w-full">
        <div className="bg-red-50 p-4 rounded-full">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500" />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-3xl font-bold text-gray-800">강퇴 알림</h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            방장에 의해 해당 방에서 <br />
            <span className="text-red-500 font-bold underline">
              강제 퇴장
            </span>{' '}
            처리되었습니다.
          </p>
        </div>
      </div>
    </Modal>
  );
};
