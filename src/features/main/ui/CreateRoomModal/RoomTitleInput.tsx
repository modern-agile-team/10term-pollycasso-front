import type { CreateRoomForm } from '@/features/main/lib/validators';
import type { UseFormReturn } from 'react-hook-form';

interface RoomTitleInputProps {
  form: UseFormReturn<CreateRoomForm>;
  roomTitle: string;
  setRoomTitle: (v: string) => void;
}

export const RoomTitleInput = ({
  form,
  roomTitle,
  setRoomTitle,
}: RoomTitleInputProps) => {
  return (
    <>
      <div className="flex mt-6">
        <span className="py-4 px-4 rounded-l-xl bg-[#419341] text-2xl text-white">
          제목
        </span>
        <div className="rounded-r-xl border border-[#419341] font-normal text-xl bg-white">
          <input
            {...form.register('name')}
            value={roomTitle}
            onChange={(e) => {
              const v = e.target.value;
              setRoomTitle(v);
              form.setValue('name', v, { shouldValidate: true });
              form.trigger('name');
            }}
            placeholder="방 제목을 입력해주세요."
            className="w-[400px] px-5 py-4 rounded-r-xl focus:outline-none"
          />
        </div>
      </div>

      {form.formState.errors.name && (
        <p className="ml-[88px] mt-2 text-red-500 font-normal text-sm">
          - {form.formState.errors.name.message}
        </p>
      )}
    </>
  );
};
