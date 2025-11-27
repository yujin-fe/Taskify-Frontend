import BackButton from '@/components/dashboard/BackButton';

export default function Mypage() {
  return (
    <div className='px-[12px] py-[16px] sm:p-[20px]'>
      <BackButton />
      <div className='mt-[10px] sm:mt-[20px] md:mt-[34px]'>마이페이지 콘텐츠 영역</div>
    </div>
  );
}
