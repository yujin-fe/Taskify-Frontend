import { useEffect } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/input/Input';
import FormModal from '@/components/common/modal/FormModal';
import { CREATE_COLUMN } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';

interface CreateColumnModalProps {
  onSubmit: () => Promise<void>;
  errorMessage: string | null;
  columnName: string;
  setColumnName: (value: string) => void;
  setErrorMessage: (value: string) => void;
}

export default function CreateColumnModal({
  onSubmit,
  errorMessage,
  columnName,
  setColumnName,
  setErrorMessage,
}: CreateColumnModalProps) {
  const { handleModalClose } = useModal(CREATE_COLUMN);

  const disabled = columnName.trim() === '';

  useEffect(() => {
    return () => {
      setColumnName('');
      setErrorMessage('');
    };
  }, [setColumnName, setErrorMessage]);

  return (
    <FormModal modalName={CREATE_COLUMN}>
      <FormModal.Title title='새 컬럼 생성' />
      <FormModal.Form onSubmit={onSubmit}>
        <FormModal.Body>
          <Input error={!!errorMessage} value={columnName} onChange={setColumnName}>
            <Input.Label className='font-lg-medium sm:font-2lg-medium'>이름</Input.Label>
            <Input.Group>
              <Input.Field name='columnName' type='text' placeholder='컬럼 이름을 입력해 주세요' />
            </Input.Group>
            {errorMessage && <Input.ErrorMessage>{errorMessage}</Input.ErrorMessage>}
          </Input>
        </FormModal.Body>
        <FormModal.Footer className='pt-[24px]'>
          <Button theme={'outlined'} onClick={handleModalClose}>
            취소
          </Button>
          <Button theme={'primary'} type='submit' disabled={disabled}>
            생성
          </Button>
        </FormModal.Footer>
      </FormModal.Form>
    </FormModal>
  );
}
