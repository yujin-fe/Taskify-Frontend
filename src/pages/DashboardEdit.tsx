import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import Button from '@/components/common/Button';
import BaseModalFrame from '@/components/common/modal/BaseModalFrame';
import BackButton from '@/components/dashboard/BackButton';
import DashboardNameEdit from '@/components/editpage/DashboardNameEdit';
import InvitesEdit from '@/components/editpage/InvitesEdit';
import MembersEdit from '@/components/editpage/MembersEdit';
import { deleteDashboard } from '@/lib/apis/dashboards';

export default function DashboardEdit() {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const navigate = useNavigate();
  const backPath = dashboardId ? `/dashboard/${dashboardId}` : '/';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const numericDashboardId = useMemo(() => {
    return dashboardId ? Number(dashboardId) : null;
  }, [dashboardId]);

  const handleModalStateClose = () => {
    setIsModalOpen(false);
  };

  const handleModalDelete = async () => {
    handleModalStateClose();

    const idToDelete = numericDashboardId;

    if (idToDelete !== null) {
      await deleteDashboard(idToDelete);

      setResetKey((prev) => prev + 1);

      navigate('/mydashboard');
    }
  };

  const handleInitialDeleteClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='mx-[12px] flex flex-col sm:mx-[20px]'>
      <div className='mt-[16px] sm:mt-[20px]'>
        <BackButton to={backPath} />
      </div>

      <div key={resetKey} className='mt-[10px] flex flex-col gap-4 sm:mt-[20px] lg:mt-[34px]'>
        <DashboardNameEdit />
        <MembersEdit />
        <InvitesEdit />
      </div>

      <Button
        theme='outlined'
        className='mt-[24px] mb-[124px] h-[52px] w-full sm:mb-[71px] sm:h-[62px] sm:w-[320px] lg:mb-[57px]'
        onClick={handleInitialDeleteClick}>
        대시보드 삭제하기
      </Button>

      {isModalOpen && (
        <BaseModalFrame setOnModal={handleModalDelete}>
          <div className='p-4 text-center'>
            <p className='mb-4 font-bold'>대시보드를 삭제하시겠습니까?</p>
          </div>
        </BaseModalFrame>
      )}
    </div>
  );
}
