import { GameCanvas } from '@/entities/drawing';
import { useEvaluating } from '../model/useEvaluating';
import { EvaluatingNavigation } from './EvaluatingNavigation';
import { EvaluatingRating } from './EvaluatingRating';

export const EvaluatingPhase = () => {
  const {
    currentDrawing,
    displayScore,
    handlePrev,
    handleNext,
    handleRate,
    setHoverScore,
  } = useEvaluating();

  return (
    <>
      <EvaluatingNavigation onPrev={handlePrev} onNext={handleNext} />

      <GameCanvas readOnly={true} lines={currentDrawing.lines} />

      <EvaluatingRating
        displayScore={displayScore}
        onRate={handleRate}
        onHoverScore={setHoverScore}
      />
    </>
  );
};
