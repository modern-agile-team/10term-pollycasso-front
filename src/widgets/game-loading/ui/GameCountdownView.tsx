import { motion } from 'framer-motion';
import { Title } from '@/assets';

interface Props {
  count: number;
}

const getCountColor = (num: number) => {
  if (num >= 3) return '#00AD66';
  if (num === 2) return '#FF7452';
  return '#FF3434';
};

const popAnimation = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    duration: 0.4,
    ease: [0.175, 0.885, 0.32, 1.275] as const,
  },
};

export const GameCountdownView = ({ count }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen z-50 fixed inset-0">
      <div className="rounded-full bg-white w-[250px] h-[250px] shadow-md flex items-center justify-center"></div>

      <div className="mt-10 text-center font-ssrm font-bold flex flex-col items-center">
        <div className="grid place-items-center h-20 w-full mt-1">
          <motion.p
            className="col-start-1 row-start-1 text-5xl text-gray-800"
            animate={{ opacity: count > 0 ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            게임 시작까지
          </motion.p>

          {count === 0 && (
            <motion.img
              src={Title}
              alt="Pollycasso"
              className="col-start-1 row-start-1 h-16 object-contain mb-4"
              {...popAnimation}
            />
          )}
        </div>

        <motion.p
          key={count}
          className="mt-5 text-6xl origin-center"
          style={{ color: getCountColor(count) }}
          {...popAnimation}
        >
          {count > 0 ? count : 'GO!!'}
        </motion.p>
      </div>
    </div>
  );
};
