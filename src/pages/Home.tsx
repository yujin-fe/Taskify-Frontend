import HomeFooter from '@/components/home/HomeFooter';
import HomeTopArea from '@/components/home/HomeTopArea';

export default function Home() {
  return (
    <div className='bg-gray-900 px-4'>
      <main className='pt-[94px]'>
        <HomeTopArea />
        {/* TODO: content 영역 추가 */}
      </main>
      <HomeFooter />
    </div>
  );
}
