import {
  Bird,
  Coin,
  GoldBelt,
  SilverBelt,
  BronzeBelt,
  LaurelWreath,
} from '@/assets';
import { RANK_STYLES } from '../constants/styles';
import { StarIcon } from '@heroicons/react/24/solid';

const BELT_IMAGES = {
  1: GoldBelt,
  2: SilverBelt,
  3: BronzeBelt,
};

interface PodiumSpotProps {
  rank: 1 | 2 | 3;
  nickname: string;
  coins: number;
  xp: number;
  score: number;
}

export const PodiumSpot = ({
  rank,
  nickname,
  coins,
  xp,
  score,
}: PodiumSpotProps) => {
  const styles = RANK_STYLES[rank];
  const beltImg = BELT_IMAGES[rank];

  return (
    <div className={styles.wrapper}>
      <img src={Bird} className={styles.bird} alt="bird" />

      <img src={beltImg} className={styles.belt} alt="belt" />

      {rank === 1 && styles.wreath && (
        <img src={LaurelWreath} className={styles.wreath} alt="wreath" />
      )}

      <div className={styles.starWrapper}>
        <StarIcon className={styles.starIcon} />
        <span className={styles.scoreText}>{score}</span>
      </div>

      <span className={styles.badge}>{nickname}</span>

      <img src={Coin} className={styles.coinIcon} alt="coin" />

      <span className={styles.rewardText}>
        {coins}Coin +<span className={styles.rewardSpan}> {xp}xp</span>
      </span>
    </div>
  );
};
