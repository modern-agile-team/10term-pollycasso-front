import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRoomSchema } from '@/features/main/lib/validators';
import type { CreateRoomForm } from '@/features/main/lib/validators';
import { TITLE_PRESETS } from '@/features/main/constants/titles';
import type { GameMode } from '@/features/main/model/types';

export const useCreateRoomForm = () => {
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
    const newPlayers = mode === 'TEAM' ? 4 : 3;
    setMaxPlayers(newPlayers);
    form.setValue('maxPlayers', newPlayers);
  };

  const increase = () => {
    const idx = allowedPlayers.indexOf(maxPlayers);
    if (idx < allowedPlayers.length - 1) {
      const v = allowedPlayers[idx + 1];
      setMaxPlayers(v);
      form.setValue('maxPlayers', v);
    }
  };

  const decrease = () => {
    const idx = allowedPlayers.indexOf(maxPlayers);
    if (idx > 0) {
      const v = allowedPlayers[idx - 1];
      setMaxPlayers(v);
      form.setValue('maxPlayers', v);
    }
  };

  const selectVisibility = (v: 'public' | 'private') => {
    setVisibility(v);
    form.setValue('isPrivate', v === 'private');
    if (v === 'public') {
      setPassword('');
      form.setValue('password', '');
    }
  };

  const canCreate =
    gameMode &&
    visibility &&
    (visibility === 'public' || password.length === 4) &&
    form.formState.isValid;

  return {
    form,
    roomTitle,
    setRoomTitle,
    gameMode,
    selectGameMode,
    maxPlayers,
    increase,
    decrease,
    isMin,
    isMax,
    visibility,
    selectVisibility,
    password,
    setPassword,
    canCreate,
  };
};
