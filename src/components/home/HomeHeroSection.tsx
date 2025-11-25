import { Link } from 'react-router';
import images from '@/assets/images';
import Button from '@/components/common/Button';
import Title from '@/components/common/Title';

export default function HomeHeroSection() {
  return (
    <section className='flex flex-col items-center gap-12 px-[40px]'>
      <img src={images.mainVisual} className='w-full lg:w-[722px]' alt='' />
      <Title
        className='flex flex-col items-center gap-1.5 text-[40px] leading-[48px] tracking-[-2px] whitespace-nowrap text-gray-0 md:flex-row md:gap-6 md:text-[56px] md:leading-[100px] lg:gap-7 lg:text-[76px]'
        weight={'bold'}>
        <span>새로운 일정 관리</span>
        <span className='font-montserrat text-[42px] tracking-[-1px] text-primary md:text-[76px] lg:text-[90px]'>
          Taskify
        </span>
      </Title>
      <Button as={Link} to={'/login'} size={'lg'} className='w-[235px] md:mt-3 md:w-[280px]'>
        로그인하기
      </Button>
    </section>
  );
}
