import { PERIODS } from '../constants/constants';
import type { PeriodId } from '../model/types';

export const RankingSidebar = ({
  selectedPeriod,
  onPeriodChange,
}: {
  selectedPeriod: PeriodId;
  onPeriodChange: (id: PeriodId) => void;
}) => (
  <div className="absolute flex flex-col -right-3 top-[250px] gap-y-8 z-10">
    {PERIODS.map((period) => (
      <button
        key={period.id}
        onClick={() => onPeriodChange(period.id)}
        style={{ backgroundColor: period.color }}
        className={`
            w-[70px] h-[160px] rounded-r-3xl text-white text-[33px] 
            flex flex-col items-center justify-center p-4 transition-all 
            ${selectedPeriod === period.id ? 'brightness-110 shadow-lg' : 'opacity-90'}
          `}
      >
        {period.label.split('').map((char, i) => (
          <span key={i} className="leading-none">
            {char}
          </span>
        ))}
      </button>
    ))}
  </div>
);
