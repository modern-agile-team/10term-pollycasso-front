import { ProfileInput } from './ProfileInput';
import type { User } from '@/entities/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileUpdateSchema, type ProfileFormValues } from '../model/schema';
import { Spinner } from '@/shared/ui/Spinner';
import type { ApiFailureResponse } from '@/shared/api';
import { isAxiosError } from 'axios';

interface ProfileSectionProps {
  user: User;
}

export const ProfileSection = ({ user }: ProfileSectionProps) => {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { isSubmitting, errors, isValid, dirtyFields },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileUpdateSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: user.nickname,
      tag: user.tag || '0000',
      currentPassword: '',
      newPassword: '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (data.currentPassword && !data.newPassword) {
      setError('newPassword', {
        type: 'manual',
        message: '비밀번호를 변경하려면 새 비밀번호를 입력해주세요.',
      });
      setFocus('newPassword');
      return;
    }

    const payload: Partial<ProfileFormValues> = {};

    if (dirtyFields.nickname) {
      payload.nickname = data.nickname;
    }

    if (dirtyFields.tag) {
      payload.tag = data.tag;
    }

    if (data.newPassword) {
      payload.currentPassword = data.currentPassword;
      payload.newPassword = data.newPassword;
    }

    if (Object.keys(payload).length === 0) {
      alert('변경된 내용이 없습니다.');
      return;
    }

    try {
      // TODO: API 호출로 프로필 수정

      alert('수정이 완료되었습니다.');
    } catch (error) {
      if (!isAxiosError<ApiFailureResponse>(error)) {
        console.error('Unknown Error:', error);
        alert('알 수 없는 오류가 발생했습니다.');
        return;
      }

      const serverCode = error.response?.data?.code;

      if (serverCode === 'WRONG_PASSWORD') {
        setError('currentPassword', {
          message: '비밀번호가 일치하지 않습니다.',
        });
        setFocus('currentPassword');
      } else if (serverCode === 'DUPLICATE_NICKNAME') {
        setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
        setFocus('nickname');
      } else {
        alert('서버 오류가 발생했습니다.');
      }
    }
  };

  const getMessageClass = (hasError: boolean) =>
    `text-sm ml-4 mt-2 font-pretendard ${
      hasError ? 'text-red-600' : 'text-green-400'
    }`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative grid grid-cols-2 grid-rows-2 w-full h-[520px] gap-x-10 gap-y-2"
    >
      <div className="flex flex-col">
        <div className="h-14 mb-2 flex items-center">
          <span className="text-4xl ml-2 font-light">닉네임 변경</span>
        </div>
        <ProfileInput
          placeholder="닉네임"
          {...register('nickname')}
          isValid={dirtyFields.nickname && !errors.nickname}
          hasError={!!errors.nickname}
        />
        <span className={getMessageClass(!!errors.nickname)}>
          {dirtyFields.nickname
            ? errors.nickname?.message || '- 사용 가능한 닉네임입니다.'
            : ''}
        </span>
      </div>

      <div className="flex flex-col pl-6">
        <div className="h-14 mb-2 flex items-center">
          <span className="text-4xl ml-2 font-light">태그 변경</span>
        </div>
        <ProfileInput
          placeholder="태그"
          {...register('tag')}
          isValid={dirtyFields.tag && !errors.tag}
          hasError={!!errors.tag}
        />
        <span className={getMessageClass(!!errors.tag)}>
          {dirtyFields.tag
            ? errors.tag?.message || '- 사용 가능한 태그입니다.'
            : ''}
        </span>
      </div>

      <div className="flex flex-col">
        <div className="h-14 mb-4 flex items-center">
          <span className="text-4xl ml-2 font-light">비밀번호 변경</span>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <ProfileInput
              type="password"
              placeholder="현재 비밀번호"
              {...register('currentPassword')}
              isValid={false}
              hasError={!!errors.currentPassword}
            />
            {errors.currentPassword?.message && (
              <span className={getMessageClass(true)}>
                {errors.currentPassword.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <ProfileInput
              type="password"
              placeholder="새 비밀번호"
              {...register('newPassword')}
              isValid={!!dirtyFields.newPassword && !errors.newPassword}
              hasError={!!errors.newPassword}
            />
            {(dirtyFields.newPassword || errors.newPassword) && (
              <span className={getMessageClass(!!errors.newPassword)}>
                {errors.newPassword?.message || '- 사용 가능한 비밀번호입니다.'}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-20 right-10">
        <button
          type="submit"
          disabled={!isValid || Object.keys(dirtyFields).length === 0}
          className={`w-[160px] h-[70px] border-2 text-3xl rounded-full transition-all shadow-lg font-bold
            ${
              isValid && Object.keys(dirtyFields).length > 0
                ? 'bg-transparent border-white text-white hover:border-green-400 hover:text-green-400 cursor-pointer'
                : 'bg-transparent border-gray-600 text-gray-600 cursor-not-allowed opacity-50'
            }`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" transparent />
            </div>
          ) : (
            '저장'
          )}
        </button>
      </div>
    </form>
  );
};
