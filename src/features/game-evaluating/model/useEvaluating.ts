import { useMemo, useState } from 'react';
import { MOCK_EVALUATING } from '@/mocks/evaluating.mock';

export const useEvaluating = () => {
  const drawingIds = useMemo(() => Object.keys(MOCK_EVALUATING.drawings), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [hoverScore, setHoverScore] = useState<number | null>(null);

  const currentId = drawingIds[currentIndex];
  const currentDrawing = MOCK_EVALUATING.drawings[currentId];
  const savedScore = scores[currentId] || 0;

  // 화면에 보여줄 점수 계산 (저장된게 있으면 호버 무시)
  const displayScore = savedScore > 0 ? savedScore : hoverScore || 0;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? drawingIds.length - 1 : prev - 1));
    setHoverScore(null);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === drawingIds.length - 1 ? 0 : prev + 1));
    setHoverScore(null);
  };

  const handleRate = (scoreValue: number) => {
    setScores((prev) => ({ ...prev, [currentId]: scoreValue }));
  };

  return {
    currentDrawing,
    displayScore,
    handlePrev,
    handleNext,
    handleRate,
    setHoverScore,
  };
};
