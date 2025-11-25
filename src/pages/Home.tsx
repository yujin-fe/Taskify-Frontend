import HomeFooter from '@/components/home/HomeFooter';
import HomeHeroSection from '@/components/home/HomeHeroSection';
import HomeIntroSection from '@/components/home/HomeIntroSection';
import HomeServiceDetailsSection from '@/components/home/HomeServiceDetailsSection';

export default function Home() {
  return (
    <div className='bg-gray-900 px-[16px] sm:px-[40px]'>
      <main className='mx-auto max-w-[1200px] pt-[94px]'>
        <HomeHeroSection />
        <HomeIntroSection />
        <HomeServiceDetailsSection />
      </main>
      <HomeFooter />
    </div>
  );
}
