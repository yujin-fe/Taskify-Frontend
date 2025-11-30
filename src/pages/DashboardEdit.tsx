import InvitsEdit from '@/components/editpage/InviteEdit';
import MembersEdit from '@/components/editpage/MembersEdit';

export default function DashboardEdit() {
  return (
    <div className='ml-[12px] flex flex-col gap-4 sm:ml-[20px]'>
      <MembersEdit />
      <InvitsEdit />
    </div>
  );
}
