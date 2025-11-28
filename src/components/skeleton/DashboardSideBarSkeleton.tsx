import Skeleton from '@/components/skeleton/Skeleton';

/**
 * 사이드바의 스켈레톤을 렌더링합니다.
 *
 * @example
 * <DashboardSideBarSkeleton length={5} isCollapsed={false} />
 */
interface DashboardSideBarSkeletonProps {
  length: number;
  isCollapsed: boolean;
}

export default function DashboardSideBarSkeleton({
  isCollapsed,
  length,
}: DashboardSideBarSkeletonProps) {
  if (isCollapsed) {
    return null;
  }

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between'>
        <Skeleton className='mb-[14px] h-[20px] w-[60px]' />
        <Skeleton className='h-[20px] w-[20px]' />
      </div>
      <div className='flex flex-col gap-[4px]'>
        {Array.from({ length }).map((_, i) => (
          <Skeleton key={i} className='h-[42px] w-[260px]' />
        ))}
      </div>
      <Skeleton className='mt-[32px] h-10 w-[80px]' />
    </div>
  );
}
