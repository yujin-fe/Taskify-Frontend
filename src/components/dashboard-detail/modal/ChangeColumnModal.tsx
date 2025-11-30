import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/input/Input';
import FormModal from '@/components/common/modal/FormModal';
import { CHANGE_COLUMN } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';

export interface ChangeColumnModalProps {
  initialName: string;
  onSubmit: (columnName: string) => Promise<void>;
  serverErrorMessage: string | null;
}

export default function ChangeColumnModal({
  initialName,
  onSubmit,
  serverErrorMessage,
}: ChangeColumnModalProps) {
  const { handleModalClose } = useModal(CHANGE_COLUMN);
  const [columnName, setColumnName] = useState(initialName);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setColumnName(initialName);
  }, [initialName]);

  const handleSubmit = async () => {
    setErrorMessage('');
    try {
      await onSubmit(columnName);
    } catch (err: unknown) {
      const msg = (err instanceof Error && err.message) || '컬럼 수정 중 오류가 발생했습니다.';

      setErrorMessage(msg);
    }
  };

  const disabled = columnName.trim() === '';
  const mergeError = errorMessage || serverErrorMessage;

  return (
    <FormModal modalName={CHANGE_COLUMN} closeBtn>
      <FormModal.Title title='컬럼 관리' />
      <FormModal.Form onSubmit={handleSubmit}>
        <FormModal.Body>
          <Input error={!!mergeError} value={columnName} onChange={setColumnName}>
            <Input.Label className='font-lg-medium sm:font-2lg-medium'>이름</Input.Label>
            <Input.Group>
              <Input.Field name='columnName' type='text' placeholder='컬럼 이름을 입력해 주세요' />
            </Input.Group>
            {mergeError && <Input.ErrorMessage>{mergeError}</Input.ErrorMessage>}
          </Input>
        </FormModal.Body>
        <FormModal.Footer className='pt-[24px]'>
          {/* TODO: 삭제 로직 추가 예정 */}
          <Button theme={'outlined'} onClick={handleModalClose}>
            삭제
          </Button>
          <Button theme={'primary'} type='submit' disabled={disabled}>
            변경
          </Button>
        </FormModal.Footer>
      </FormModal.Form>
    </FormModal>
  );
}
