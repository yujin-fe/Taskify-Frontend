import { useContext } from 'react';
import { DropdownMenuContext } from '@/context/dropdownMenuContext';
import { cn } from '@/utils/cn';

interface DropdownMenuTriggerProps {
  children?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export default function DropdownMenuTrigger({
  children,
  ariaLabel,
  className,
}: DropdownMenuTriggerProps) {
  const { handleToggleOpen } = useContext(DropdownMenuContext);

  return (
    <div
      role='button'
      tabIndex={0}
      className={cn('flex cursor-pointer', className)}
      onClick={handleToggleOpen}
      aria-label={ariaLabel}>
      {children}
    </div>
  );
}
