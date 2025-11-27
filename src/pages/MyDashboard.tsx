import Button from '@/components/common/Button';
import FormModal from '@/components/common/modal/FormModal';
import CreateButton from '@/components/dashboard/CreateButton';
import { NEW_DASHBOARD } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';

export default function MyDashboard() {
  const { handleModalOpen, handleModalClose } = useModal(NEW_DASHBOARD);

  return (
    <>
      <div className='p-[24px] sm:p-[40px]'>
        <div className='flex flex-col gap-[8px] sm:grid sm:grid-cols-2 sm:grid-rows-3 sm:gap-[10px] lg:grid-cols-3 lg:grid-rows-2 lg:gap-[13px]'>
          <CreateButton className='h-[58px] font-lg-semibold' onClick={handleModalOpen}>
            새로운 대시보드
          </CreateButton>
        </div>
      </div>
      {/* TODO: 새로운 대시보드 내부 요소 구현 및 API 연결 필요 */}
      <FormModal modalName={NEW_DASHBOARD}>
        <FormModal.Title title='새로운 대시보드' />
        <FormModal.Form
          onSubmit={() => {
            console.log('나중에 바꿔야합니다 폼 제출!');
            handleModalClose();
          }}>
          <FormModal.Body>인풋, 컬러칩</FormModal.Body>
          <FormModal.Footer>
            <Button theme={'outlined'} onClick={handleModalClose}>
              취소
            </Button>
            <Button theme={'primary'} type='submit'>
              생성
            </Button>
          </FormModal.Footer>
        </FormModal.Form>
      </FormModal>
    </>
  );
}
