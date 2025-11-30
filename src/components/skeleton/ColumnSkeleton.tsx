import Skeleton from '@/components/skeleton/Skeleton';

export default function ColumnSkeleton() {
  return (
    <div className='w-full p-[20px] md:w-[354px]'>
      <div className='mb-[24px] flex items-center justify-between'>
        <div className='flex items-center gap-[8px] select-none'>
          <Skeleton className='h-[8px] w-[8px] rounded-full' />
          <Skeleton className='h-[24px] w-[60px]' />
        </div>
        <Skeleton className='ml-[12px] h-[24px] w-[24px] rounded-[4px]' />
      </div>
      <Skeleton className='h-[160px] w-full md:h-[calc(100dvh-200px)]' />
    </div>
  );
}
