import DropdownMenuItem from '@/components/dashboard/dropdown/DropdownMenuItem';
import DropdownMenuList from '@/components/dashboard/dropdown/DropdownMenuList';
import DropdownMenuTrigger from '@/components/dashboard/dropdown/DropdownMenuTrigger';
import { DropdownMenuContext } from '@/context/dropdownMenuContext';
import useDropdownMenu from '@/hooks/useDropdownMenu';

export default function DropdownMenu({ children }: { children: React.ReactNode }) {
  const dropdown = useDropdownMenu();

  return (
    <DropdownMenuContext value={dropdown}>
      <div className='relative w-fit'>{children}</div>
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
 * 자식 요소로 드롭다운 메뉴 아이템 컴포넌트를 전달해야 합니다.
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
