import Icons from '@/assets/icons';
import { cn } from '@/utils/cn';

const baseButtonStyle =
  'flex h-10 w-10 items-center justify-center border text-gray-300 transition-colors hover:border-gray-300 hover:bg-violet-500/10 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent';

type NavigationButtonProps = {
  onClick: () => void;
  direction: 'prev' | 'next';
  ariaLabel: string;
  disabled?: boolean;
};

export function NavigationButton({
  onClick,
  direction,
  ariaLabel,
  disabled,
}: NavigationButtonProps) {
  const Icon = direction === 'prev' ? Icons.ArrowLeft : Icons.ArrowRight;

  const borderRadiusClass =
    direction === 'prev'
      ? 'rounded-tl-[4px] rounded-bl-[4px]'
      : 'rounded-tr-[4px] rounded-br-[4px]';

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(baseButtonStyle, borderRadiusClass)}
      aria-label={ariaLabel}>
      <Icon className='h-6 w-6' aria-hidden='true' />
    </button>
  );
}

type PageNationProps = {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
};

export default function PageNation({
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  className,
}: PageNationProps) {
  return (
    <div className={cn('flex h-10 w-20 items-center justify-between', className)}>
      <NavigationButton
        onClick={onPrev}
        direction='prev'
        ariaLabel='이전 페이지'
        disabled={prevDisabled}
      />
      <NavigationButton
        onClick={onNext}
        direction='next'
        ariaLabel='다음 페이지'
        disabled={nextDisabled}
      />
    </div>
  );
}
