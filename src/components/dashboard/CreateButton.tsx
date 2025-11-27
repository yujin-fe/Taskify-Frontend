import Icons from '@/assets/icons';
import { cn } from '@/utils/cn';

interface CreateButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function CreateButton({ onClick, className, children }: CreateButtonProps) {
  return (
    <button
      type='button'
      className={cn(
        'flex h-[32px] w-full cursor-pointer items-center justify-center rounded-[6px] border border-gray-300 bg-gray-0 sm:h-[40px]',
        children && 'gap-[12px] text-gray-700 sm:h-[70px]',
        className
      )}
      {...(!children && { 'aria-label': '할 일 추가하기' })}
      onClick={onClick}>
      {children}
      <Icons.Plus
        width={22}
        height={22}
        className='rounded-[4px] bg-violet-500-8 p-[3px] text-primary'
      />
    </button>
  );
}
