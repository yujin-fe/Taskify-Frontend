import { cva } from 'class-variance-authority';
import type { ColorType } from '@/types/ui';

const tagStyles = cva(
  'inline-block px-1.5 py-1 rounded-sm font-xs-regular sm:py-0.5 sm:font-md-regular',
  {
    variants: {
      color: {
        orange: 'text-orange-500 bg-orange-500/8',
        blue: 'text-blue-500 bg-blue-500/8',
        green: 'text-green-500 bg-green-500/8',
        pink: 'text-pink-500 bg-pink-500/8',
        purple: 'text-purple-500 bg-purple-500/8',
      },
    },
  }
);

interface TagProps {
  children: React.ReactNode;
  color: ColorType;
}

/**
 * Tag 컴포넌트
 * 대시보드 카드, 태그 인풋에서 사용되는 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <Tag color='orange'>태그</Tag>
 * ```
 */
export default function Tag({ children, color }: TagProps) {
  return <span className={tagStyles({ color })}>{children}</span>;
}
