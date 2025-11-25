import { type ReactNode } from 'react';

interface DashboardBodyProps {
  children: ReactNode;
  className?: string;
}

/**
 * 대시보드의 바디 영역을 렌더링하는 컨테이너 컴포넌트입니다.
 * 내부 자식 요소들을 수직(flex-col)으로 배치하는 기본 레이아웃을 제공하며,
 * className을 통해 외부 스타일 확장이 가능합니다.
 */

export default function DashboardBody({ children, className }: DashboardBodyProps) {
  const baseClasses = 'flex flex-col';

  return <div className={`${baseClasses} ${className}`}>{children}</div>;
}
