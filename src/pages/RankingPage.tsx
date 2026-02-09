import { useState, useMemo, useEffect } from 'react';
import { RankingBoard } from '@/assets';
import {
  RankingDropdown,
  RankingHeader,
  RankingRow,
  RankingSidebar,
} from '@/features/ranking';
import type { PeriodId, RankingCriteria } from '@/features/ranking';
import { RANKING_MOCK_DATA } from '@/mocks/ranking.mock';
import { BackButton } from '@/shared/ui/BackButton';

const RankingPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodId>('daily');
  const [criteria, setCriteria] = useState<RankingCriteria>('score');
  const [scale, setScale] = useState(1);

  const DESIGN_WIDTH = 1350;
  const DESIGN_HEIGHT = 950;

  useEffect(() => {
    const handleResize = () => {
      const widthScale = window.innerWidth / DESIGN_WIDTH;
      const heightScale = window.innerHeight / DESIGN_HEIGHT;

      const newScale = Math.min(widthScale, heightScale, 1);
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentRankings = useMemo(() => {
    return RANKING_MOCK_DATA[criteria][selectedPeriod] || [];
  }, [criteria, selectedPeriod]);

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center font-ssrm font-bold overflow-hidden">
      <BackButton />
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          width: `${DESIGN_WIDTH}px`,
          height: `${DESIGN_HEIGHT}px`,
        }}
        className="relative flex-shrink-0 transition-transform duration-900 ease-out"
      >
        <span className="absolute top-[120px] left-1/2 -translate-x-1/2 text-white text-6xl z-10 select-none">
          RANK
        </span>

        <RankingHeader />
        <RankingDropdown onSelect={(val) => setCriteria(val)} />
        <RankingSidebar
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />

        <div className="absolute flex flex-col justify-between items-center bottom-[160px] left-[140px] w-[1090px] h-[470px] text-white text-lg px-10 rounded-t-xl z-10">
          {currentRankings.map((user, index) => (
            <RankingRow key={user.username} user={user} index={index} />
          ))}
        </div>

        <img
          src={RankingBoard}
          alt="Ranking Board"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        />
      </div>
    </div>
  );
};

export default RankingPage;
