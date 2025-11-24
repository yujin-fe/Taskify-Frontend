import type { ComponentPropsWithoutRef } from 'react';
import useInputContext from '@/hooks/useInputContext';
import { cn } from '@/utils/cn';

interface InputLabelProps extends ComponentPropsWithoutRef<'label'> {
  required?: boolean; // true면 '*' 표시
}
/**
 * InputLabel 컴포넌트 (공통 라벨)
 *
 * - 기본 HTML <label> 태그를 기반으로 만든 공통 컴포넌트입니다.
 * - children에는 문자열, 아이콘, 다양한 JSX 요소를 자유롭게 넣을 수 있습니다.
 *
 * 사용 예시:
 *   <InputLabel className="text-sm font-medium">
 *     아이디
 *   </InputLabel>
 */

export default function InputLabel({
  children,
  className,
  required = false,
  ...props
}: InputLabelProps) {
  const { id } = useInputContext();

  return (
    <label htmlFor={id} className={cn('text-gray-700', className)} {...props}>
      {children}
      {required && <span className='font-lg-regular text-violet-500'>*</span>}
    </label>
  );
}
