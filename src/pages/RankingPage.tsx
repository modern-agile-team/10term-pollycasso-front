import { useState, useMemo } from 'react';
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

  const currentRankings = useMemo(() => {
    return RANKING_MOCK_DATA[criteria][selectedPeriod] || [];
  }, [criteria, selectedPeriod]);

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen font-ssrm font-bold overflow-hidden">
      <BackButton />

      <span className="absolute top-[88px] text-white text-6xl">RANK</span>

      <RankingHeader />

      <RankingDropdown onSelect={(val) => setCriteria(val)} />

      <RankingSidebar
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <div className="absolute flex flex-col justify-between items-center bottom-[130px] left-[305px] w-[1090px] h-[470px] text-white text-lg px-10 rounded-t-xl z-10">
        {currentRankings.map((user, index) => (
          <RankingRow key={user.username} user={user} index={index} />
        ))}
      </div>

      <img src={RankingBoard} alt="Ranking Board" className="w-[1350px]" />
    </div>
  );
};

export default RankingPage;
