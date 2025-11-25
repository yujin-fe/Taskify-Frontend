import HomeFooter from '@/components/home/HomeFooter';
import HomeHeader from '@/components/home/HomeHeader';
import HomeHeroSection from '@/components/home/HomeHeroSection';
import HomeIntroSection from '@/components/home/HomeIntroSection';
import HomeServiceDetailsSection from '@/components/home/HomeServiceDetailsSection';

export default function Home() {
  /**
   * TODO: 로그인 되었을 때 /dashboard/{dashboardId}로,
   * dashboard가 없다면 /dashboard 리다이렉트 되도록 구현
   */

  return (
    <div className='bg-gray-900 px-[16px] sm:px-[40px]'>
      <HomeHeader />
      <main className='mx-auto max-w-[1200px] pt-[94px]'>
        <HomeHeroSection />
        <HomeIntroSection />
        <HomeServiceDetailsSection />
      </main>
      <HomeFooter />
    </div>
  );
}
