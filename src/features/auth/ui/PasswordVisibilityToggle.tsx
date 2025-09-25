import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface PasswordVisibilityToggleProps {
  isShown: boolean;
  onToggle: () => void;
}

export const PasswordVisibilityToggle = ({
  isShown,
  onToggle,
}: PasswordVisibilityToggleProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="focus:outline-none"
      aria-label={isShown ? '비밀번호 숨기기' : '비밀번호 보기'}
    >
      {isShown ? (
        <EyeIcon className="w-6 h-6 stroke-1 text-[#5A5A5A]" />
      ) : (
        <EyeSlashIcon className="w-6 h-6 stroke-1 text-[#5A5A5A]" />
      )}
    </button>
  );
};
