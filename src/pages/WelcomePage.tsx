import { motion } from 'framer-motion';
import { useAuthStore } from '@/entities/user';
import { OUTFIT_LAYERS } from '@/shared/lib/cdn';
import { getOutfitItemUrl } from '@/shared/lib/assets';
import { welcomeVariants, useWelcomeLogic } from '@/features/welcome';

const WelcomePage = () => {
  const user = useAuthStore((state) => state.user);
  const { leaving, animType } = useWelcomeLogic(user);

  if (!user) return null;

  const currentVariant = welcomeVariants[animType];

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <motion.div
        custom={leaving}
        initial="initial"
        animate="animate"
        variants={currentVariant}
        className="relative w-[250px] h-[250px] bg-white rounded-full shadow-lg border-4 border-white overflow-hidden flex items-center justify-center"
      >
        <div className="relative w-full h-full bg-black/5">
          {OUTFIT_LAYERS.map((layer) => {
            const partId = user.outfit![layer];
            if (!partId) return null;

            return (
              <img
                key={layer}
                src={getOutfitItemUrl(partId)}
                alt={layer}
                className="absolute left-0 w-full h-full object-cover scale-110 top-[10%]"
                style={{ zIndex: OUTFIT_LAYERS.indexOf(layer) }}
              />
            );
          })}
        </div>
      </motion.div>

      <div className="mt-10 text-center font-ssrm font-bold">
        <p className="text-4xl text-gray-800">
          <span className="text-green-500">{user.nickname}</span> 님
        </p>
        <p className="mt-2 text-4xl text-gray-800">안녕하세요!</p>
      </div>
    </div>
  );
};

export default WelcomePage;
