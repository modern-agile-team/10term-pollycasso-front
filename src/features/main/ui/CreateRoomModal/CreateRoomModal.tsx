import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';

import title from '@/assets/title.svg';
import type { GameMode, Room } from '@/entities/room';
import { cn } from '@/shared/lib';
import { Spinner } from '@/shared/ui/Spinner';
import { TITLE_PRESETS } from '../../constants/titles';
import type { CreateRoomForm } from '../../lib/validators';
import { createRoomSchema } from '../../lib/validators';
import { useCreateRoomModalStore } from '../../model/useCreateRoomModalStore';
import { useCreateRoomMutation } from '../../model/useCreateRoomMutation';
import { GameModeSelector } from './GameModeSelector';
import { MaxPlayerSelector } from './MaxPlayerSelector';
import { PasswordInput } from './PasswordInput';
import { RoomTitleInput } from './RoomTitleInput';
import { VisibilitySelector } from './VisibilitySelector';

export const CreateRoomModal = () => {
  const navigate = useNavigate();
  const { isOpen, close } = useCreateRoomModalStore();
  const { mutate, isPending } = useCreateRoomMutation();

  const form = useForm<CreateRoomForm>({
    resolver: zodResolver(createRoomSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      mode: undefined,
      maxPlayers: 3,
      isPrivate: false,
      password: '',
    },
  });

  const { watch, setValue, handleSubmit, formState } = form;

  const gameMode = watch('mode');
  const maxPlayers = watch('maxPlayers');
  const isPrivate = watch('isPrivate');
  const visibility = isPrivate ? 'private' : 'public';
  const password = watch('password');
  const roomTitle = watch('name');

  useEffect(() => {
    const randomTitle =
      TITLE_PRESETS[Math.floor(Math.random() * TITLE_PRESETS.length)];
    setValue('name', randomTitle);
  }, [setValue]);

  const allowedPlayers = gameMode === 'TEAM' ? [4, 6] : [3, 4, 5, 6];
  const isMin = maxPlayers === allowedPlayers[0];
  const isMax = maxPlayers === allowedPlayers[allowedPlayers.length - 1];

  const selectGameMode = (mode: GameMode) => {
    setValue('mode', mode, { shouldValidate: true });
    const newPlayers = mode === 'TEAM' ? 4 : 3;
    setValue('maxPlayers', newPlayers, { shouldValidate: true });
  };

  const increaseMaxPlayers = () => {
    const idx = allowedPlayers.indexOf(maxPlayers);
    if (idx < allowedPlayers.length - 1) {
      const v = allowedPlayers[idx + 1];
      setValue('maxPlayers', v, { shouldValidate: true });
    }
  };

  const decreaseMaxPlayers = () => {
    const idx = allowedPlayers.indexOf(maxPlayers);
    if (idx > 0) {
      const v = allowedPlayers[idx - 1];
      setValue('maxPlayers', v, { shouldValidate: true });
    }
  };

  const selectVisibility = (v: 'public' | 'private') => {
    const isPrivate = v === 'private';
    setValue('isPrivate', isPrivate, { shouldValidate: true });
    if (!isPrivate) {
      setValue('password', '', { shouldValidate: true });
    }
  };

  const onSubmit = (data: CreateRoomForm) => {
    if (!data.isPrivate && data.password === '') {
      delete data.password;
    }

    mutate(data, {
      onSuccess: (room: Room) => {
        close();
        navigate(`/room/${room.id}`);
      },
      onError: () => {
        alert('방 생성에 실패했습니다.');
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
      <div className="relative bg-[#F2F2F2] w-[700px] p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <button
          onClick={close}
          className="absolute top-4 right-4 bg-gray-300 rounded-md p-1"
        >
          <XMarkIcon className="w-7 h-7 text-white" />
        </button>

        <img src={title} alt="Title" className="w-[450px] mt-6" />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <RoomTitleInput
            form={form}
            roomTitle={roomTitle}
            setRoomTitle={(title) =>
              setValue('name', title, { shouldValidate: true })
            }
          />

          <div className="grid grid-cols-3 gap-x-6 mt-6 text-center text-2xl">
            <GameModeSelector
              gameMode={gameMode}
              selectGameMode={selectGameMode}
            />
            <MaxPlayerSelector
              maxPlayers={maxPlayers}
              isMin={isMin}
              isMax={isMax}
              increase={increaseMaxPlayers}
              decrease={decreaseMaxPlayers}
            />
            <VisibilitySelector
              visibility={visibility}
              selectVisibility={selectVisibility}
            />
          </div>

          <PasswordInput
            visibility={visibility}
            password={password ?? ''}
            setPassword={(pass) =>
              setValue('password', pass, { shouldValidate: true })
            }
            form={form}
          />

          <button
            type="submit"
            disabled={!formState.isValid || isPending}
            className={cn(
              'relative',
              'mt-8 mb-4 text-white text-3xl font-bold py-6 rounded-xl transition',
              isPending || formState.isValid
                ? 'bg-[#003D00]'
                : 'bg-gray-400 cursor-not-allowed',
              !isPending && formState.isValid && 'hover:scale-105',
            )}
          >
            <span className={isPending ? 'opacity-0' : 'opacity-100'}>
              방만들기
            </span>
            {isPending && (
              <Spinner overlay={true} transparent={true} size="md" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
