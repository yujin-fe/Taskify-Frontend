import { useEffect, useRef } from 'react';
import Icons from '@/assets/icons';
import Avatar from '@/components/common/avatar/Avatar';
import CardStatusBadge from '@/components/dashboard-detail/card/CardStatusBadge';
import useComboboxContext from '@/hooks/useComboboxContext';
import { cn } from '@/utils/cn';

interface ComboboxTriggerContainerProps {
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

/** @internal ComboboxTrigger 전용 컨테이너입니다. 외부에서 사용하지 마세요. */
function ComboboxTriggerContainer({ children, isOpen, onClick }: ComboboxTriggerContainerProps) {
  return (
    <div
      role='combobox'
      aria-expanded={isOpen}
      aria-haspopup='listbox'
      aria-label='검색 및 선택'
      tabIndex={0}
      className='flex h-[48px] w-full cursor-pointer justify-between rounded-md border border-gray-300 bg-gray-0 px-[16px] py-[11px] focus-within:border-primary'
      onClick={onClick}>
      {children}
    </div>
  );
}

interface ComboboxTriggerProps {
  placeholder: string;
  name: string;
}

export default function ComboboxTrigger({ placeholder, name }: ComboboxTriggerProps) {
  const { id, isOpen, setIsOpen, searchQuery, setSearchQuery, selectedValue } =
    useComboboxContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery('');
    }
  };

  let valueContent;

  if (!selectedValue) {
    valueContent = <span className='text-gray-400'>{placeholder}</span>;
  } else if ('nickname' in selectedValue) {
    valueContent = (
      <div className='flex items-center gap-2'>
        <Avatar
          size='s'
          user={{
            id: selectedValue.userId ?? selectedValue.id,
            nickname: selectedValue.nickname,
            profileImageUrl: selectedValue.profileImageUrl,
          }}>
          <Avatar.Img />
          <Avatar.Fallback />
        </Avatar>
        <span className='font-medium'>{selectedValue.nickname}</span>
      </div>
    );
  } else if ('title' in selectedValue) {
    valueContent = (
      <div className='flex items-center'>
        <CardStatusBadge title={selectedValue.title} />
      </div>
    );
  } else {
    valueContent = <span className='font-medium'>{String(selectedValue)}</span>;
  }

  const arrow = <Icons.ArrowDropdown className={cn('text-gray-700', { 'rotate-180': isOpen })} />;

  if (isOpen) {
    return (
      <ComboboxTriggerContainer isOpen={true} onClick={handleTriggerClick}>
        <input
          id={id}
          ref={inputRef}
          type='text'
          name={name}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className='w-full focus:outline-0'
          onClick={(e) => e.stopPropagation()}
        />
        {arrow}
      </ComboboxTriggerContainer>
    );
  }

  return (
    <ComboboxTriggerContainer isOpen={false} onClick={handleTriggerClick}>
      <input
        id={id}
        ref={inputRef}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='sr-only'
        onFocus={() => {
          if (!isOpen) {
            setIsOpen(true);
            setSearchQuery('');
          }
        }}
        tabIndex={-1}
      />
      {valueContent}
      {arrow}
    </ComboboxTriggerContainer>
  );
}
