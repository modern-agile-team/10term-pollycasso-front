import { Coin, LaurelWreath } from '@/assets';
import { TEAM_RANK_STYLES } from '../constants/styles';

interface PodiumSpotProps {
  rank: 1 | 2 | 3;
  nickname: string;
  coins: number;
  xp: number;
  teamId: string | null;
}

export const TeamPodiumSpot = ({
  rank,
  nickname,
  coins,
  xp,
  teamId,
}: PodiumSpotProps) => {
  const styles = TEAM_RANK_STYLES[rank];

  const badgeBgClass = teamId === 'BLUE' ? 'bg-[#64ACFF]' : 'bg-[#FB6464]';

  return (
    <div className={styles.wrapper}>
      <img src={''} className="relative w-full h-full" alt="bird" />

      <img
        src={LaurelWreath}
        className="absolute -top-5 left-[50%] -translate-x-1/2 w-[120px] h-[120px] object-contain"
        alt="wreath"
      />

      <span className={`${styles.badge} ${badgeBgClass}`}>{nickname}</span>

      <div className={styles.rewardWrapper}>
        <img src={Coin} className="w-5 h-5 object-contain" alt="coin" />
        <span className="font-ssrm font-bold text-white text-xl drop-shadow-sm">
          {coins}Coin+{xp}xp
        </span>
      </div>
    </div>
  );
};
