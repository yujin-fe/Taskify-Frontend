import useDropdownContext from '@/hooks/useDropdownContext';

// Dropdown 메뉴와 트리거 사이의 간격을 정의 (트리거 아래 8px)
const DROPDOWN_MARGIN_TOP = 'top-[calc(100%+8px)]';

export default function DropdownList({ children }: { children: React.ReactNode }) {
  const { isOpen } = useDropdownContext();

  if (!isOpen) {
    return null;
  }

  return (
    <ul
      role='menu'
      className={`absolute right-0 z-1000 flex w-[93px] flex-col justify-center rounded-md bg-gray-0 px-1.5 py-1.75 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] ${DROPDOWN_MARGIN_TOP}`}>
      {children}
    </ul>
  );
}
