import { useContext } from 'react';
import Title from '@/components/common/Title';
import { FormModalContext } from '@/context/FormModalContext';
export default function FormModalTitle({ title }: { title: string }) {
  const { finalSize } = useContext(FormModalContext);
  return finalSize === 'md' ? (
    <Title as='h2' size='2xl' weight={'bold'} className='md:text-lg'>
      {title}
    </Title>
  ) : (
    <Title as='h2' size='2xl' weight={'bold'}>
      {title}
    </Title>
  );
}
