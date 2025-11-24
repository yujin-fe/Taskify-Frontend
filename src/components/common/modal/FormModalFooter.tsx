import { useContext } from 'react';
import Button from '@/components/common/Button';
import { FormModalContext } from '@/context/formModalContext';
export default function FormModalFooter({
  cancleButton,
  submitButton,
}: {
  cancleButton: string;
  submitButton: string;
}) {
  const { handleModalClose } = useContext(FormModalContext);
  return (
    <div className={'flex w-[295px] max-sm:gap-[7px] sm:w-[520px] sm:gap-2'}>
      <Button
        size='lg'
        theme={'outlined'}
        onClick={() => {
          handleModalClose();
        }}>
        {cancleButton}
      </Button>
      <Button size='lg' theme={'primary'} type='submit'>
        {submitButton}
      </Button>
    </div>
  );
}
