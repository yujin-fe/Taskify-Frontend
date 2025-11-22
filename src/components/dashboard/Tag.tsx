import { cva } from 'class-variance-authority';
import Icons from '@/assets/icons';
import type { ColorTypes } from '@/constants/color';

const tagStyles = cva(
  'w-fit flex items-center px-1.5 py-1 rounded-sm font-xs-regular sm:py-0.5 sm:font-md-regular gap-2',
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
  color: ColorTypes;
  onDelete?: () => void;
}

/**
 * ### Tag 컴포넌트
 * 대시보드 카드, 태그 인풋에서 사용되는 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <Tag color='orange'>태그</Tag>
 * // 태그를 삭제해야 하는 경우 onDelete 메서드를 넘겨주면 됩니다.
 * <Tag color='orange' onDelete={onClick}>태그</Tag>
 * ```
 */
export default function Tag({ children, color, onDelete }: TagProps) {
  return (
    <div className={tagStyles({ color })}>
      <span>{children}</span>
      {onDelete && (
        <button className='h-4 w-4 cursor-pointer text-gray-500' type='button' onClick={onDelete}>
          <Icons.Close width={16} height={16} />
        </button>
      )}
    </div>
  );
}
