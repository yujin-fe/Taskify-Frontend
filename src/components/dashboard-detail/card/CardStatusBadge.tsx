import { cn } from '@/utils/cn';

interface CardStatusBadgeProps {
  title: string;
  className?: string;
}

export default function CardStatusBadge({ title, className }: CardStatusBadgeProps) {
  return (
    <div
      className={cn(
        'flex h-[26px] w-fit shrink-0 items-center gap-[6px] rounded-[16px] bg-violet-500-8 px-[10px] font-xs-regular select-none sm:h-[32px] sm:font-lg-regular',
        className
      )}>
      <div className='h-[6px] w-[6px] rounded-full bg-primary' />
      <span className='text-primary'>{title}</span>
    </div>
  );
}
