import CreateButton from '@/components/dashboard/CreateButton';
import DashboardCreateModal from '@/components/dashboard/modal/DashboardCreateModal';
import { NEW_DASHBOARD } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';

export default function MyDashboard() {
  const { handleModalOpen, isOpen } = useModal(NEW_DASHBOARD);

  return (
    <>
      <div className='p-[24px] sm:p-[40px]'>
        <div className='flex flex-col gap-[8px] sm:grid sm:grid-cols-2 sm:grid-rows-3 sm:gap-[10px] lg:grid-cols-3 lg:grid-rows-2 lg:gap-[13px]'>
          <CreateButton className='h-[58px] font-lg-semibold' onClick={handleModalOpen}>
            새로운 대시보드
          </CreateButton>
        </div>
      </div>
      {isOpen && <DashboardCreateModal />}
    </>
  );
}
