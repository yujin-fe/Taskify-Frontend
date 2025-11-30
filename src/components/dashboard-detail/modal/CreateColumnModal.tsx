import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/input/Input';
import FormModal from '@/components/common/modal/FormModal';
import { CREATE_COLUMN } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';

interface CreateColumnModalProps {
  onSubmit: (columnName: string) => Promise<void>;
  serverErrorMessage: string | null;
}

export default function CreateColumnModal({
  onSubmit,
  serverErrorMessage,
}: CreateColumnModalProps) {
  const { handleModalClose } = useModal(CREATE_COLUMN);
  const [columnName, setColumnName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    return () => {
      setColumnName('');
      setErrorMessage('');
    };
  }, []);

  const handleSubmit = async () => {
    setErrorMessage('');
    try {
      await onSubmit(columnName);
    } catch (err: unknown) {
      const msg = (err instanceof Error && err.message) || '컬럼 생성 중 오류가 발생했습니다.';

      setErrorMessage(msg);
    }
  };

  const disabled = columnName.trim() === '';
  const mergeError = errorMessage || serverErrorMessage;

  return (
    <FormModal modalName={CREATE_COLUMN}>
      <FormModal.Title title='새 컬럼 생성' />
      <FormModal.Form onSubmit={handleSubmit}>
        <FormModal.Body>
          <Input error={!!mergeError} value={columnName} onChange={setColumnName}>
            <Input.Label className='label-style'>이름</Input.Label>
            <Input.Group>
              <Input.Field name='columnName' type='text' placeholder='컬럼 이름을 입력해 주세요' />
            </Input.Group>
            {mergeError && <Input.ErrorMessage>{mergeError}</Input.ErrorMessage>}
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
