import { useMemo } from 'react';
import ComboboxItem from '@/components/dashboard/combobox/ComboboxItem';
import ComboboxList from '@/components/dashboard/combobox/ComboboxList';
import ComboboxTrigger from '@/components/dashboard/combobox/ComboboxTrigger';
import ComboboxContext from '@/context/comboboxContext';
import useComboboxState from '@/hooks/useComboboxState';

interface ComboboxProps {
  children: React.ReactNode;
  value: string;
  setValue: (value: string) => void;
}

/**
 * Combobox 컴포넌트는 Combobox UI의 루트 컨테이너입니다.
 *
 * 내부에서 컴포넌트의 열림/닫힘, 검색어, 선택된 자식 요소를 관리하고,
 * 외부 상태값인 `Combobox`에 설정된 value/setValue를
 * 하위 컴포넌트에 Context 형태로 전달합니다.
 *
 * @example
 * const [value, setValue] = useState('');
 *
 * <Combobox value={value} setValue={setValue}>
 *   <Combobox.Trigger placeholder='담당자를 선택해주세요.' name='user' />
 *   <Combobox.List>
 *     <Combobox.Item value="홍길동">
 *      홍길동
 *     </Combobox.Item>
 *   </Combobox.List>
 * </Combobox>
 */
export default function Combobox({ children, value, setValue }: ComboboxProps) {
  const { isOpen, setIsOpen, searchQuery, setSearchQuery, selectedNode, setSelectedNode } =
    useComboboxState();

  const contextValue = useMemo(
    () => ({
      selectedValue: value,
      setSelectedValue: setValue,
      isOpen,
      setIsOpen,
      searchQuery,
      setSearchQuery,
      selectedNode,
      setSelectedNode,
    }),
    [value, setValue, isOpen, setIsOpen, searchQuery, setSearchQuery, selectedNode, setSelectedNode]
  );

  return (
    <ComboboxContext value={contextValue}>
      <div className='relative w-full'>{children}</div>
    </ComboboxContext>
  );
}

/**
 * Combobox 트리거 컴포넌트 입니다.
 *
 * - 선택된 값이 없으면: placeholder 표시됩니다.
 * - 선택된 값이 있고 리스트가 닫혀있으면: 선택된 아이템의 children이 표시됩니다.
 * - 리스트가 열려있으면: 검색 가능한 input으로 변경됩니다.
 */
Combobox.Trigger = ComboboxTrigger;

/**
 * Combobox 리스트 컴포넌트입니다.
 *
 * 내부에는 반드시 `Combobox.Item` 컴포넌트만 자식으로 전달해야 합니다.
 *
 * @example
 *  <Combobox.List>
 *    <Combobox.Item value="홍길동">...</Combobox.Item>
 *  </Combobox.List>
 */
Combobox.List = ComboboxList;

/**
 * Combobox에서 선택 가능한 체크 아이템 컴포넌트입니다.
 *
 * 선택 시 부모 `Combobox`에 설정된 value/setValue 통해 선택 값이 반영됩니다.
 *
 * @example
 *  <Combobox.Item value="홍길동">
 *    홍길동
 *  </Combobox.Item>
 */
Combobox.Item = ComboboxItem;
