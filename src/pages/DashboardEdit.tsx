import { useParams, useNavigate } from 'react-router';
import Button from '@/components/common/Button';
import BackButton from '@/components/dashboard/BackButton';
import DashboardNameEdit from '@/components/editpage/DashboardNameEdit';
import InvitesEdit from '@/components/editpage/InvitesEdit';
import MembersEdit from '@/components/editpage/MembersEdit';

export default function DashboardEdit() {
  const { dashboardId } = useParams<{ dashboardId: string }>();

  const navigate = useNavigate();
  const backPath = dashboardId ? `/dashboard/${dashboardId}` : '/';

  return (
    <div className='mx-[12px] flex flex-col sm:mx-[20px]'>
      <div className='mt-[16px] sm:mt-[20px]'>
        <BackButton to={backPath} />
      </div>
      <div className='mt-[10px] flex flex-col gap-4 sm:mt-[20px] lg:mt-[34px]'>
        <DashboardNameEdit />
        <MembersEdit />
        <InvitesEdit />
      </div>
      <Button
        theme='outlined'
        className='mt-[24px] mb-[124px] h-[52px] w-full sm:mb-[71px] sm:h-[62px] sm:w-[320px] lg:mb-[57px]'
        onClick={() => navigate('/mydashboard')}>
        대시보드 삭제하기
      </Button>
    </div>
  );
}
