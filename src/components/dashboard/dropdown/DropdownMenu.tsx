import DropdownMenuCheckItem from '@/components/dashboard/dropdown/DropdownMenuCheckItem';
import DropdownMenuCheckList from '@/components/dashboard/dropdown/DropdownMenuCheckList';
import DropdownMenuItem from '@/components/dashboard/dropdown/DropdownMenuItem';
import DropdownMenuList from '@/components/dashboard/dropdown/DropdownMenuList';
import DropdownMenuTrigger from '@/components/dashboard/dropdown/DropdownMenuTrigger';
import { DropdownMenuContext } from '@/context/dropdownMenuContext';
import useDropdownMenu from '@/hooks/useDropdownMenu';
import { cn } from '@/utils/cn';

interface DropdownMenuProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

export default function DropdownMenu({
  children,
  value,
  onValueChange,
  className,
}: DropdownMenuProps) {
  const dropdown = useDropdownMenu({ value, onValueChange });

  return (
    <DropdownMenuContext value={dropdown}>
      <div className={cn('relative w-fit', className)}>{children}</div>
    </DropdownMenuContext>
  );
}
/**
 * 드롭다운 메뉴 트리거 컴포넌트 입니다.
 * 클릭하면 드롭다운 메뉴 리스트가 보여집니다.
 * 
 * @example
 *  <DropdownMenu.Trigger ariaLabel='더보기 메뉴'>
      <Icons.KebabMore />
    </DropdownMenu.Trigger>
 */
DropdownMenu.Trigger = DropdownMenuTrigger;

/**
 * 드롭다운 메뉴 리스트 컴포넌트입니다.
 * 내부에는 반드시 `DropdownMenu.Item` 컴포넌트만 자식으로 전달해야 합니다.
 * 
 * @example
 *  <DropdownMenu.List>
      <DropdownMenu.Item>...</DropdownMenu.Item>
    </DropdownMenu.List>
 */
DropdownMenu.List = DropdownMenuList;

/**
 * 드롭다운 메뉴 아이템 컴포넌트입니다.
 * 메뉴명, 메뉴를 클릭했을 때 실행할 함수를 전달합니다.
 *
 * @example
 *  <DropdownMenu.Item onClick={함수}>메뉴명</DropdownMenu.Item>
 */
DropdownMenu.Item = DropdownMenuItem;

/**
 * 드롭다운 메뉴에서 체크 가능한 아이템들을 감싸는 리스트 컴포넌트입니다.
 * 내부에는 반드시 `DropdownMenu.CheckItem` 컴포넌트만 자식으로 전달해야 합니다.
 *
 * @example
 *  <DropdownMenu.CheckList>
 *    <DropdownMenu.CheckItem value="홍길동">...</DropdownMenu.CheckItem>
 *  </DropdownMenu.CheckList>
 */
DropdownMenu.CheckList = DropdownMenuCheckList;

/**
 * 드롭다운 메뉴에서 선택 가능한 체크 아이템 컴포넌트입니다.
 * 선택 시 부모 `DropdownMenu`에 설정된 value/onValueChange를 통해 선택 값이 반영됩니다.
 *
 * @example
 *  <DropdownMenu.CheckItem value="홍길동">
 *    홍길동
 *  </DropdownMenu.CheckItem>
 */
DropdownMenu.CheckItem = DropdownMenuCheckItem;
