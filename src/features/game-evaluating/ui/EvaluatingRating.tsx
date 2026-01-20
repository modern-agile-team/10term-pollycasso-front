import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface EvaluationRatingProps {
  displayScore: number;
  onRate: (score: number) => void;
  onHoverScore: (score: number | null) => void;
}

export const EvaluatingRating = ({
  displayScore,
  onRate,
  onHoverScore,
}: EvaluationRatingProps) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
      <div className="flex gap-3 mb-2" onMouseLeave={() => onHoverScore(null)}>
        {[0, 1, 2, 3, 4].map((index) => {
          const scoreForHalf = index * 2 + 1;
          const scoreForFull = (index + 1) * 2;

          let fillClass = 'w-0';
          if (displayScore >= scoreForFull) {
            fillClass = 'w-full';
          } else if (displayScore === scoreForHalf) {
            fillClass = 'w-1/2';
          }

          return (
            <div
              key={index}
              className="relative w-14 h-14 cursor-pointer hover:scale-110 active:scale-95"
            >
              <StarOutlineIcon className="absolute inset-0 w-full h-full text-gray-300" />

              <div
                className={`absolute left-0 top-0 h-full overflow-hidden ${fillClass}`}
              >
                <StarIcon className="w-14 h-14 text-yellow-400 drop-shadow-md min-w-[3.5rem]" />
              </div>

              <button
                onMouseEnter={() => onHoverScore(scoreForHalf)}
                onClick={() => onRate(scoreForHalf)}
                className="absolute left-0 top-0 w-1/2 h-full z-10 opacity-0"
              />

              <button
                onMouseEnter={() => onHoverScore(scoreForFull)}
                onClick={() => onRate(scoreForFull)}
                className="absolute right-0 top-0 w-1/2 h-full z-10 opacity-0"
              />
            </div>
          );
        })}
      </div>

      <div className="text-4xl font-black text-gray-700 font-ssrm tracking-tight">
        <span className="text-[#FF5F5F]">{displayScore}</span>
        <span className="text-gray-400 text-3xl">/10점</span>
      </div>
    </div>
  );
};
