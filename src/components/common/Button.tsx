import { cva, type VariantProps } from 'class-variance-authority';
import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

const ButtonStyle = cva(
  `bg-gray-0 rounded-lg flex items-center justify-center border-[1px] border-solid border-gray-300 
  cursor-pointer disabled:bg-gray-400 disabled:border-none disabled:cursor-default 
  hover:bg-gray-100 hover:border-gray-400`,
  {
    variants: {
      theme: {
        primary: 'bg-primary text-gray-0 border-none hover:bg-purple-500',
        secondary: 'text-primary',
        outlined: 'text-gray-500',
        icon: 'text-gray-500',
      },
      size: {
        lg: 'h-[54px] py-[14px] rounded-lg grow font-lg-medium',
        md: 'h-[50px] py-[14px] rounded-lg grow font-2lg-medium',
        sm: 'h-[32px] py-[7px] px-[29px] rounded-sm font-md-medium',
        icon: 'h-[40px] px-[16px] pt-[11px] pb-[10px] gap-[8px]',
      },
    },
    defaultVariants: {
      theme: 'primary',
      size: 'lg',
    },
  }
);

interface ButtonProps<T extends React.ElementType> extends VariantProps<typeof ButtonStyle> {
  as?: T;
  children: ReactNode;
  type?: React.ComponentProps<'button'>['type'];
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

//as로 받은 태그의 타입+제작한 버튼프롭스의 타입에서 겹치는 타입을 제거
type AsProps<T extends React.ElementType> = ButtonProps<T>
  & Omit<React.ComponentProps<T>, keyof ButtonProps<T>>;

/**
 *  Button 컴포넌트
 *
 *  size는 높이 값을 기준으로 나누었습니다
 *  lg: 높이 54px py 14px
 *  md: 높이 50px py 14px
 *  sm: 높이 32px py 7px
 *  icon이 있다면 icon
 *  예외는 className에 적용해주세요
 *
 *  as={Link}는 to={'경로'}와 같이 사용해주세요
 *  폼 제출하는 타입의 버튼은 type="submit"을 명시해주세요
 * @example
 * <Button theme="primary" size="lg" type="submit" className="h-[62px]">
 *   버튼
 * </Button>
 *
 * 가이드 노션 링크: https://www.notion.so/ahahahahreum/2af5213dcd4c80c58445d9438784da50?source=copy_link
 */

export default function Button<T extends React.ElementType = 'button'>({
  as,
  children,
  theme,
  size,
  type = 'button',
  disabled = false,
  className,
  onClick,
  ...props
}: AsProps<T>) {
  const Component = as || 'button';

  const componentProps = {
    className: cn(ButtonStyle({ theme, size }), className),
    ...(Component === 'button' ? { type } : {}),
    ...(Component === 'button' ? { disabled } : {}),
    onClick,
    ...props,
  };
  return <Component {...componentProps}>{children}</Component>;
}
