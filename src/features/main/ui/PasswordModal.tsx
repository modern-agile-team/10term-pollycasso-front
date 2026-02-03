import { useState } from 'react';
import { Modal } from '@/shared/ui/Modal';

interface PasswordModalProps {
  error: string | null;
  onSubmit: (password: string) => void;
  onCancel: () => void;
}

export const PasswordModal = ({
  error,
  onSubmit,
  onCancel,
}: PasswordModalProps) => {
  const [password, setPassword] = useState('');

  return (
    <Modal
      onClose={onCancel}
      onConfirm={() => onSubmit(password)}
      confirmText="입장하기"
      cancelText="취소"
      isForm={true}
    >
      <div className="flex flex-col items-center gap-2 mb-4 w-full">
        <h2 className="text-2xl font-bold text-gray-700">비공개 방 입장</h2>
        <p className="text-sm text-gray-400">비밀번호를 입력해주세요</p>
      </div>

      <div className="relative w-full flex justify-center">
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••"
          maxLength={20}
          className="bg-gray-100 w-[300px] h-[60px] text-3xl text-center rounded-xl outline-none border-2 border-transparent focus:bg-white focus:border-[#2ADB75] transition-all placeholder:text-gray-300 text-gray-700 shadow-sm"
        />

        {error && (
          <p className="absolute -bottom-8 text-red-500 font-bold text-sm animate-bounce">
            {error}
          </p>
        )}
      </div>
    </Modal>
  );
};
