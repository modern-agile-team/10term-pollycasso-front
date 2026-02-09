import { useState } from 'react';
import type { RankingCriteria } from '../model/types';
import { CRITERIA_LABELS } from '../constants/constants';

interface RankingDropdownProps {
  onSelect: (criteria: RankingCriteria) => void;
}

export const RankingDropdown = ({ onSelect }: RankingDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<RankingCriteria>('score');

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (criteria: RankingCriteria) => {
    setSelected(criteria);
    onSelect(criteria);
    setIsOpen(false);
  };

  const otherCriteria: RankingCriteria =
    selected === 'coins' ? 'score' : 'coins';

  return (
    <div className="absolute top-[261px] right-[160px] z-20 flex flex-col items-center w-[200px]">
      <div
        className={`
          absolute top-0 w-full bg-[#F2F2F2] rounded-[30px] shadow-md transition-all duration-300 overflow-hidden
          ${isOpen ? 'h-[110px] pt-[55px]' : 'h-[50px] pt-0'}
        `}
      >
        <button
          onClick={() => handleSelect(otherCriteria)}
          className="w-full h-[50px] text-[#69500B] text-xl hover:bg-black/5 transition-colors"
        >
          {CRITERIA_LABELS[otherCriteria]}
        </button>
      </div>

      <button
        onClick={handleToggle}
        className="relative w-full h-[50px] rounded-full bg-[#69500B] text-white text-xl z-10"
      >
        {CRITERIA_LABELS[selected]}
      </button>
    </div>
  );
};
