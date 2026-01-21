import { useCountdown } from './ui/useCountdown';
import { GameCountdownView } from './ui/GameCountdownView';

interface GameLoadingProps {
  duration?: number;
  onFinished?: () => void;
}

const GameLoading = ({ duration = 5, onFinished }: GameLoadingProps) => {
  const count = useCountdown(duration, onFinished);

  return <GameCountdownView count={count} />;
};

export default GameLoading;
