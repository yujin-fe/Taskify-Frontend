import Title from '@/components/common/Title';
import DashboardBody from '@/components/dashboard/table/DashboardBody';
import DashboardContainer from '@/components/dashboard/table/DashboardContainer';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
// import DashboardList from '@/components/dashboard/table/DashboardList';

export default function InvitsEdit() {
  return (
    <DashboardContainer type='Invites'>
      <DashboardHeader>
        <Title as='h2' size='xl' weight='bold' className='pl-5 sm:pl-7 sm:text-2xl'>
          초대내역
        </Title>
      </DashboardHeader>
      <DashboardBody>
        d
        {/* <DashboardList title='이메일' titleClassName='sm:pl-7 pl-5 pt-[20px] sm:pt-[31px]'>
          {invitsListItems}
        </DashboardList> */}
      </DashboardBody>
    </DashboardContainer>
  );
}
