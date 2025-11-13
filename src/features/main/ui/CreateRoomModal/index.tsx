import { XMarkIcon } from '@heroicons/react/24/solid';
import title from '@/assets/title.svg';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createRoomSchema,
  type CreateRoomForm,
} from '@/features/main/lib/validators';
import type { GameMode } from '@/features/main/model/types';
import { RoomTitleInput } from './RoomTitleInput';
import { GameModeSelector } from './GameModeSelector';
import { MaxPlayerSelector } from './MaxPlayerSelector';
import { VisibilitySelector } from './VisibilitySelector';
import { PasswordInput } from './PasswordInput';
import { CreateConfirmButton } from './CreateConfirmButton';
import { TITLE_PRESETS } from '@/features/main/constants/titles';

interface CreateRoomModalProps {
  onClose: () => void;
}

export const CreateRoomModal = ({ onClose }: CreateRoomModalProps) => {
  const [roomTitle, setRoomTitle] = useState('');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [maxPlayers, setMaxPlayers] = useState(3);
  const [visibility, setVisibility] = useState<'public' | 'private' | null>(
    null,
  );
  const [password, setPassword] = useState('');

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

  useEffect(() => {
    const randomTitle =
      TITLE_PRESETS[Math.floor(Math.random() * TITLE_PRESETS.length)];
    setRoomTitle(randomTitle);
    form.setValue('name', randomTitle);
  }, []);

  const allowedPlayers = gameMode === 'TEAM' ? [4, 6] : [3, 4, 5, 6];
  const isMin = maxPlayers === allowedPlayers[0];
  const isMax = maxPlayers === allowedPlayers[allowedPlayers.length - 1];

  const selectGameMode = (mode: GameMode) => {
    setGameMode(mode);
    form.setValue('mode', mode.toUpperCase() as GameMode);
    form.trigger('mode');

    const newPlayers = mode === 'TEAM' ? 4 : 3;
    setMaxPlayers(newPlayers);
    form.setValue('maxPlayers', newPlayers);
    form.trigger('maxPlayers');
  };

  const increaseMaxPlayers = () => {
    const idx = allowedPlayers.indexOf(maxPlayers);
    if (idx < allowedPlayers.length - 1) {
      const v = allowedPlayers[idx + 1];
      setMaxPlayers(v);
      form.setValue('maxPlayers', v);
      form.trigger('maxPlayers');
    }
  };

  const decreaseMaxPlayers = () => {
    const idx = allowedPlayers.indexOf(maxPlayers);
    if (idx > 0) {
      const v = allowedPlayers[idx - 1];
      setMaxPlayers(v);
      form.setValue('maxPlayers', v);
      form.trigger('maxPlayers');
    }
  };

  const selectVisibility = (v: 'public' | 'private') => {
    setVisibility(v);
    const isPrivate = v === 'private';
    form.setValue('isPrivate', isPrivate);
    form.trigger('isPrivate');

    if (!isPrivate) {
      setPassword('');
      form.setValue('password', '');
      form.trigger('password');
    }
  };

  const canCreate =
    gameMode &&
    visibility &&
    (visibility === 'public' || password.length === 4) &&
    form.formState.isValid;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="relative bg-[#F2F2F2] w-[700px] p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-300 rounded-md p-1"
        >
          <XMarkIcon className="w-7 h-7 text-white" />
        </button>

        <img src={title} alt="Title" className="w-[450px] mt-6" />

        <form onSubmit={form.handleSubmit(onClose)} className="flex flex-col">
          <RoomTitleInput
            form={form}
            roomTitle={roomTitle}
            setRoomTitle={setRoomTitle}
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
            password={password}
            setPassword={setPassword}
            form={form}
          />

          <CreateConfirmButton canCreate={!!canCreate} />
        </form>
      </div>
    </div>
  );
};
