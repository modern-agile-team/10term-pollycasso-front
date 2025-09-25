import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const WelcomePage = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
        }}
        onClick={goToLoginPage}
        className="w-[250px] h-[250px] bg-white rounded-full shadow-md cursor-pointer"
      />

      <div className="mt-10 text-center font-ssrm font-bold">
        <span className="text-4xl text-green-500">밥아저씨</span>
        <span className="text-4xl">
          님<br />
        </span>
        <p className="mt-1 text-4xl">안녕하세요!</p>
      </div>
    </div>
  );
};

export default WelcomePage;
