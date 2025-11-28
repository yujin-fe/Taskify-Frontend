import { cn } from '@/utils/cn';

/**
 * 로딩 상태를 표시하는 기본 스켈레톤 컴포넌트
 *
 * @example
 * <Skeleton className="h-10 w-full" />
 * <Skeleton className="h-20 w-32 rounded-full" />
 */
export default function Skeleton({ className }: { className: string }) {
  return <div className={cn('animate-pulse rounded-md bg-gray-200', className)} />;
}
