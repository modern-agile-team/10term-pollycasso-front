import { MOCK_ROUND_SUMMARY } from '@/mocks/summary.mock';
import { useState, useMemo } from 'react';

export const useRoundSummary = () => {
  const [selectedRank, setSelectedRank] = useState(1);
  const { ranking } = MOCK_ROUND_SUMMARY;

  const currentResult = useMemo(() => {
    return ranking[selectedRank - 1] || ranking[0];
  }, [selectedRank, ranking]);

  const handleRankSelect = (rank: number) => {
    setSelectedRank(rank);
  };

  return {
    ranking,
    selectedRank,
    currentResult,
    handleRankSelect,
  };
};
