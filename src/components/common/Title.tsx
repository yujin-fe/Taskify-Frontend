import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const titleVariants = cva('text-gray-700', {
  variants: {
    size: {
      '3xl': 'text-3xl',
      '2xl': 'text-2xl',
      xl: 'text-xl',
      '2lg': 'text-2lg',
      lg: 'text-lg',
      md: 'text-md',
      sm: 'text-sm',
      xs: 'text-xs',
    },
    weight: {
      bold: 'font-bold',
      semibold: 'font-semibold',
      medium: 'font-medium',
      regular: 'font-normal',
    },
  },
  defaultVariants: {
    size: '2xl',
    weight: 'regular',
  },
});

interface TitleProps extends VariantProps<typeof titleVariants> {
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
}

/**
 * Title 컴포넌트
 *
 * Tailwind 기반의 공통 타이틀 컴포넌트입니다.
 * h2~h6 태그 선택 가능하며, size와 weight로 스타일링 가능합니다.
 * 기본 컬러는 text-gray-700이며, 예외는 className으로 적용합니다.
 *
 * @example
 * <Title as="h3" size="2xl" weight="medium" className="text-violet-500">
 *   보라색 타이틀
 * </Title>
 */

export default function Title({
  as: Component = 'h2',
  children,
  className,
  size,
  weight,
}: TitleProps) {
  return (
    <Component className={cn(titleVariants({ size, weight }), className)}>{children}</Component>
  );
}
