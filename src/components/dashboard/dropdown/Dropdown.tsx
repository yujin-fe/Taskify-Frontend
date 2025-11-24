import { useState } from 'react';
import DropdownItem from '@/components/dashboard/dropdown/DropdownItem';
import DropdownList from '@/components/dashboard/dropdown/DropdownList';
import DropdownTrigger from '@/components/dashboard/dropdown/DropdownTrigger';
import DropdownContext from '@/context/dropdownContext';

/**
 * Dropdown 컴포넌트는 Dropdown UI의 루트 컨테이너입니다.
 *
 * 내부에서 드롭다운의 열림/닫힘 상태를 관리하고,
 * 하위 컴포넌트에 Context 형태로 전달합니다.
 *
 * @example
 * <Dropdown>
 *   <Dropdown.Trigger>
 *     <Icons.KebabMore />
 *   </Dropdown.Trigger>
 *   <Dropdown.List>
 *     <Dropdown.Item onClick={함수}>메뉴명</Dropdown.Item>
 *   </Dropdown.List>
 * </Dropdown>
 */
export default function Dropdown({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContext value={{ isOpen, setIsOpen }}>
      <div className='relative w-fit'>{children}</div>
    </DropdownContext>
  );
}
/**
 * 드롭다운 메뉴 트리거 컴포넌트 입니다.
 * 
 * 클릭하면 드롭다운 메뉴 리스트가 보여집니다.
 * 
 * @example
 *  <Dropdown.Trigger ariaLabel='더보기 메뉴'>
      <Icons.KebabMore />
    </Dropdown.Trigger>
 */
Dropdown.Trigger = DropdownTrigger;

/**
 * 드롭다운 메뉴 리스트 컴포넌트입니다.
 * 
 * 내부에는 반드시 `Dropdown.Item` 컴포넌트만 자식으로 전달해야 합니다.
 * 
 * @example
 *  <Dropdown.List>
      <Dropdown.Item>...</Dropdown.Item>
    </Dropdown.List>
 */
Dropdown.List = DropdownList;

/**
 * 드롭다운 메뉴 아이템 컴포넌트입니다.
 *
 * 메뉴명, 메뉴를 클릭했을 때 실행할 함수를 전달합니다.
 *
 * @example
 *  <Dropdown.Item onClick={함수}>메뉴명</Dropdown.Item>
 */
Dropdown.Item = DropdownItem;
