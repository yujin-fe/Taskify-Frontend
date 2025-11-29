import Skeleton from '@/components/skeleton/Skeleton';
import { cn } from '@/utils/cn';

interface HeaderSkeletonProps {
  isDashboardDetail?: boolean;
  isCollapsed?: boolean;
}

export default function HeaderSkeleton({ isDashboardDetail, isCollapsed }: HeaderSkeletonProps) {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full bg-gray-0 px-[8px] md:pr-[24px] lg:pr-[40px]',
        isCollapsed ? 'pl-[65px]' : 'md:pl-[300px]'
      )}>
      <div className='flex h-[70px] items-center justify-between pl-[16px] md:pl-[40px]'>
        <Skeleton className='h-8 w-20 sm:h-10' />

        {isDashboardDetail && (
          <div className='mr-2 ml-auto flex gap-[16px] sm:mr-4'>
            <Skeleton className='h-[30px] w-[40px] sm:h-[40px] sm:w-[88px]' />
            <Skeleton className='h-[30px] w-[70px] sm:h-[40px] sm:w-[116px]' />
          </div>
        )}

        {isDashboardDetail && (
          <Skeleton className={cn('h-[38px]', isCollapsed ? 'w-[40px]' : 'w-[60px]')} />
        )}

        {isDashboardDetail && <div className='mx-2 h-[38px] border-r border-gray-300 sm:mx-4' />}

        <div className='flex items-center gap-2'>
          <Skeleton className='h-[38px] w-[38px] rounded-full' />
          <Skeleton className='hidden h-[30px] w-[80px] md:block' />
        </div>
      </div>
    </header>
  );
}
