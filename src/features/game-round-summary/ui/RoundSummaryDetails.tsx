import {
  StarIcon,
  ArrowsRightLeftIcon,
  PencilIcon,
} from '@heroicons/react/24/solid';
import type { DrawData } from '@/entities/drawing';
import { useDrawAnalysis } from '../model/useDrawAnalysis';
import { DetailSection } from './DetailSection';
import { VerticalDivider } from './VerticalDivider';

interface RoundSummaryDetailsProps {
  drawData: DrawData;
  score: number;
}

export const RoundSummaryDetails = ({
  drawData,
  score,
}: RoundSummaryDetailsProps) => {
  const { topColors, starDisplay, stats, achievement } = useDrawAnalysis(
    drawData,
    score,
  );

  const { styles, icon: AchievementIcon, label } = achievement;

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 pointer-events-none bg-white/95 backdrop-blur-md px-8 py-3 rounded-[2rem] shadow-xl border border-white/60">
      <DetailSection title="Palette">
        <div className="flex gap-2 h-9 items-center">
          {topColors.map((color) => (
            <div
              key={color}
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-100"
              style={{ backgroundColor: color }}
            />
          ))}
          {topColors.length === 0 && (
            <div className="w-8 h-8 rounded-full border-2 border-gray-200 bg-gray-50" />
          )}
        </div>
      </DetailSection>

      <VerticalDivider />

      <DetailSection title="Effort">
        <div className="flex flex-col gap-1 w-full px-1">
          <div className="flex items-center justify-between gap-2 text-gray-600">
            <ArrowsRightLeftIcon className="w-3 h-3 text-gray-400" />
            <span className="text-xs font-bold font-ssrm">
              {stats.distanceMeter}m
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 text-gray-600">
            <PencilIcon className="w-3 h-3 text-gray-400" />
            <span className="text-xs font-bold font-ssrm">
              {stats.strokeCount}획
            </span>
          </div>
        </div>
      </DetailSection>

      <VerticalDivider />

      <DetailSection title="Rating">
        {' '}
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-1">
            {starDisplay.stars.map((type, i) => (
              <div key={i} className="relative w-8 h-8">
                <StarIcon className="absolute inset-0 text-gray-200" />
                {type !== 'empty' && (
                  <div
                    className={`absolute left-0 top-0 h-full overflow-hidden ${type === 'half' ? 'w-1/2' : 'w-full'}`}
                  >
                    <StarIcon className="w-8 h-8 text-yellow-400 min-w-[2rem]" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-xs font-bold text-gray-400 font-ssrm -mt-1">
            <span className="text-[#FF5F5F] text-lg mr-0.5">
              {starDisplay.displayScore.toFixed(1)}
            </span>
            / 10
          </div>
        </div>
      </DetailSection>

      <VerticalDivider />

      <DetailSection title="Title" className="min-w-[100px]">
        <div
          className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm transition-all
          ${styles.bg} ${styles.border}
        `}
        >
          <AchievementIcon className={`w-4 h-4 ${styles.iconColor}`} />
          <span
            className={`text-xs font-extrabold whitespace-nowrap ${styles.text}`}
          >
            {label}
          </span>
        </div>
      </DetailSection>
    </div>
  );
};
