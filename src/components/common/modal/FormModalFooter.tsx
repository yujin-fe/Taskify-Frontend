import { cn } from '@/utils/cn';

export default function FormModalFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('flex w-full max-w-[520px] gap-[7px] pt-6 sm:w-[520px] sm:gap-2', className)}>
      {children}
    </div>
  );
}
