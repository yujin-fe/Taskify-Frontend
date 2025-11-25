import React from 'react';
import type { ReactNode } from 'react';

/*
 * DashboardHeader 컴포넌트
 * * 상단 영역 레이아웃 컨테이너입니다.
 * - 첫 번째 자식 (제목)은 좌측에 배치됩니다.
 * - 나머지 모든 자식 (컨트롤)은 우측에 그룹화됩니다.
 */

export default function DashboardHeader({ children }: { children: ReactNode }) {
  const childrenArray = React.Children.toArray(children);
  const titleElement = childrenArray[0];
  const controlElements = childrenArray.slice(1);
  const shouldRenderControls = controlElements.length > 0;

  return (
    <div className={'flex items-center justify-between'}>
      {titleElement}

      {shouldRenderControls && (
        <div className='flex flex-wrap items-center justify-end gap-[12px] sm:gap-[16px]'>
          {controlElements}
        </div>
      )}
    </div>
  );
}
