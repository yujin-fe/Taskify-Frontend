import Skeleton from '@/components/skeleton/Skeleton';

/**
 * 대시보드 로딩 상태를 표시하는 스켈레톤 컴포넌트
 * 사이드바와 헤더, 메인 영역의 스켈레톤을 렌더링합니다.
 *
 * @example
 * <DashboardSkeleton length={5} />
 */
export default function DashboardSkeleton({ length }: { length: number }) {
  return (
    <div className='flex'>
      <aside className='fixed top-0 left-0 h-screen w-[300px] border-r border-gray-200 bg-gray-0 p-5'>
        <Skeleton className='mb-[56px] h-[32px] w-[110px]' />
        <Skeleton className='mb-3 h-4 w-20' />
        <div className='flex flex-col gap-[8px]'>
          {Array.from({ length: length }).map((_, i) => (
            <Skeleton key={i} className='h-[42px] w-[260px]' />
          ))}
        </div>
        <Skeleton className='mt-[32px] h-10 w-[80px]' />
      </aside>
      <div className='ml-[300px] w-full'>
        <header className='fixed top-0 right-0 left-[300px] flex h-[70px] items-center border-b border-gray-200 bg-gray-0 px-[40px]'>
          <Skeleton className='h-8 w-32' />
          <div className='ml-auto flex items-center gap-3'>
            <Skeleton className='ml-6 h-[38px] w-[38px] rounded-full' />
            <Skeleton className='h-[30px] w-[80px]' />
          </div>
        </header>
        <main className='h-[100dvh] bg-base px-[40px] pt-[100px]' />
      </div>
    </div>
  );
}
