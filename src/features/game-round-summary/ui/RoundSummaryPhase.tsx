import { GameCanvas } from '@/entities/drawing';
import { useRoundSummary } from '../model/useRoundSummary';
import { RoundSummaryNavigation } from './RoundSummaryNavigation';
import { RoundSummaryDetails } from './RoundSummaryDetails';

export const RoundSummaryPhase = () => {
  const { ranking, selectedRank, currentResult, handleRankSelect } =
    useRoundSummary();

  return (
    <>
      <RoundSummaryNavigation
        ranking={ranking}
        selectedRank={selectedRank}
        onSelect={handleRankSelect}
      />

      <GameCanvas readOnly={true} lines={currentResult.drawData.lines} />

      <RoundSummaryDetails
        drawData={currentResult.drawData}
        score={currentResult.score}
      />
    </>
  );
};
