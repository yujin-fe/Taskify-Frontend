import Icons from '@/assets/icons';

interface ColumnInfoHeaderProps {
  title: string;
  totalCount: number;
  onClick: () => void;
}

export default function ColumnInfoHeader({ title, totalCount, onClick }: ColumnInfoHeaderProps) {
  return (
    <div className='mb-[24px] flex items-center justify-between'>
      <div className='flex items-center gap-[8px] select-none'>
        <div className='h-[8px] w-[8px] rounded-full bg-primary' />
        <span className='font-2lg-bold'>{title}</span>
        <span className='ml-[4px] flex h-[20px] items-center rounded-[4px] bg-gray-200 px-[6px] text-[12px] text-gray-500'>
          {totalCount}
        </span>
      </div>
      <button
        type='button'
        className='cursor-pointer'
        aria-label='컬럼 설정 수정'
        onClick={onClick}>
        <Icons.Setting width={24} height={24} className='text-gray-500' />
      </button>
    </div>
  );
}
