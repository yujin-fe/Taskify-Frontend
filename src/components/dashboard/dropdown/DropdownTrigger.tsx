import useDropdownContext from '@/hooks/useDropdownContext';
import { cn } from '@/utils/cn';

interface DropdownTriggerProps {
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export default function DropdownTrigger({ children, ariaLabel, className }: DropdownTriggerProps) {
  const { setIsOpen, isOpen } = useDropdownContext();

  return (
    <button
      className={cn('flex cursor-pointer', className)}
      type='button'
      onClick={() => setIsOpen(!isOpen)}
      aria-label={ariaLabel}>
      {children}
    </button>
  );
}
