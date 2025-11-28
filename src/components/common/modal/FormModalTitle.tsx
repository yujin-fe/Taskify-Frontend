import { useContext } from 'react';
import icons from '@/assets/icons';
import Title from '@/components/common/Title';
import { FormModalContext } from '@/context/formModalContext';
import { cn } from '@/utils/cn';
export default function FormModalTitle({ title }: { title: string }) {
  const { finalSize, handleModalClose, closeBtn } = useContext(FormModalContext);
  return (
    <div className='flex'>
      <Title
        as='h2'
        size='2xl'
        weight={'bold'}
        className={cn('flex-1', finalSize === 'md' && 'max-sm:text-lg')}>
        {title}
      </Title>
      {closeBtn && (
        <button onClick={handleModalClose} aria-label='모달 닫기' className='cursor-pointer'>
          <icons.Close className='h-[24px] w-[24px] text-gray-700 sm:h-[36px] sm:w-[36px]' />
        </button>
      )}
    </div>
  );
}
