import type { CreateRoomForm } from '@/features/main/lib/validators';
import type { UseFormReturn } from 'react-hook-form';

interface PasswordInputProps {
  visibility: 'public' | 'private' | null;
  password: string;
  setPassword: (v: string) => void;
  form: UseFormReturn<CreateRoomForm>;
}

export const PasswordInput = ({
  visibility,
  password,
  setPassword,
  form,
}: PasswordInputProps) => {
  if (visibility !== 'private') return null;

  return (
    <div className="flex mt-6">
      <span className="p-4 rounded-l-xl bg-[#027DFF] text-2xl text-white">
        비밀번호
      </span>
      <div className="rounded-r-xl border border-[#027DFF] bg-white">
        <input
          type="password"
          maxLength={4}
          inputMode="numeric"
          placeholder="비밀번호를 입력해주세요. (4자리 숫자)"
          value={password}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) {
              setPassword(val);
              form.setValue('password', val);
              form.trigger('password');
            }
          }}
          className="w-[358px] px-5 py-5 rounded-r-xl focus:outline-none"
        />
      </div>
    </div>
  );
};
