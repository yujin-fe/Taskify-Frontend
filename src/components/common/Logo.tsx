import type { ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router';
import Logos from '@/assets/logos';
import { cn } from '@/utils/cn';

type LogoProps = {
  size?: 'Large' | 'Medium' | 'Small'; //해당 prop을 활용하여 Logo의 크기를 지정할 수 있습니다.
  color?: 'primary' | 'base'; // 해당 prop들로 색상 지정할 수 있습니다.
  className?: string;
} & ComponentPropsWithoutRef<'h1'>;

export function Logo({ size = 'Medium', color = 'primary', className, ...rest }: LogoProps) {
  //default 값
  const LogoComponent = Logos[size];

  const colorClass = color === 'primary' ? 'text-primary' : 'text-base';

  return (
    <h1 className={cn('inline-flex', className)} {...rest}>
      <Link to='/' className={cn('inline-flex', colorClass)} aria-label='Taskify 홈으로 이동'>
        <LogoComponent />
      </Link>
    </h1>
  );
}
