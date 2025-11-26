import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  required?: boolean; // true면 '*' 표시
}
/**
 * Label 컴포넌트 (공통 라벨)
 *
 * - 기본 HTML <label> 태그를 기반으로 만든 공통 컴포넌트입니다.
 * - htmlFor Prop을 통해 input과 연결할 수 있습니다.
 * - children에는 문자열, 아이콘, 다양한 JSX 요소를 자유롭게 넣을 수 있습니다.
 *
 * 사용 예시:
 *   <Label htmlFor="username" className="text-sm font-medium">
 *     아이디
 *   </Label>
 *
 *   <input id="username" type="text" />
 */

export default function Label({
  htmlFor,
  children,
  className,
  required = false,
  ...props
}: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn('text-gray-700', className)} {...props}>
      {children}
      {required && <span className='font-lg-regular text-violet-500'>*</span>}
    </label>
  );
}
