import Spinner from '@/shared/ui/Spinner';
import clsx from 'clsx';
import background from '@/assets/background.svg';

const SamplePage = () => {
  return (
    <div
      className={clsx('w-screen h-screen bg-no-repeat bg-cover bg-center')}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div
        className={clsx(
          'flex flex-col justify-center items-center h-full text-center',
        )}
      >
        <p className={clsx('text-3xl font-bold')}>
          폴리카소 그리고 모던애자일 화이팅!
        </p>
        <p className={clsx('mt-2')}>예쁜 스피너도 있어요.</p>
        <p className={clsx('mb-6')}>로그인 링크도 테스트 해보세요! (/login)</p>
        <Spinner message="폴리가 물감 쏟는 중..." />
      </div>
    </div>
  );
};

export default SamplePage;
