import { cn } from '@/utils/cn';

export interface DashboardListProps {
  className?: string;
  title: string | string[];
  titleClassName?: string;
  children: React.ReactNode;
}

/**
 * 대시보드의 테이블 리스트 전체를 렌더링하는 리스트 컴포넌트입니다.
 * className을 통해 외부 스타일 확장이 가능하며, title을 표시합니다.
 * @example
 * // 1. 단일 문자열 (하나의 제목) 전달 시
 * <DashboardList title="이름">
 * <DashboardItem>
 * <DashboardItem.Content />
 * </DashboardItem>
 * </DashboardList>
 * * @example
 * // 2. 문자열 배열 (여러 개의 열 제목) 전달 시
 * <DashboardList title={["이름", "초대자"]} titleClassName='sm:pl-7 pl-5' >
 * <DashboardItem>
 * <DashboardItem.Content />
 * </DashboardItem>
 * </DashboardList>
 */

export default function DashboardList({
  className,
  title,
  children,
  titleClassName,
}: DashboardListProps) {
  const titles = Array.isArray(title) ? title : [title];

  return (
    <div className={className}>
      <div className='flex items-center justify-between'>
        {titles.map((t, index) => (
          <h4
            key={index}
            className={cn('font-md-regular text-gray-400 sm:font-lg-regular', titleClassName)}>
            {t}
          </h4>
        ))}
      </div>
      <ul>{children}</ul>
    </div>
  );
}
