import { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import BaseModalFrame from '@/components/common/modal/BaseModalFrame';
import PageIndicator from '@/components/common/PageIndicator';
import PageNation from '@/components/common/PageNation';
import Title from '@/components/common/Title';
import InviteButton from '@/components/dashboard/InviteButton';
import DashboardBody from '@/components/dashboard/table/DashboardBody';
import DashboardContainer from '@/components/dashboard/table/DashboardContainer';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import DashboardItem from '@/components/dashboard/table/DashboardItem';
import DashboardList from '@/components/dashboard/table/DashboardList';
import Skeleton from '@/components/skeleton/Skeleton';
import useBaseModal from '@/hooks/useBaseModal';
import useMutation from '@/hooks/useMutation';
import { usePagination } from '@/hooks/usePagination';
import useQuery from '@/hooks/useQuery';
import type { DeleteInvitationParams } from '@/lib/apis/Invitations';
import { getInvitationList, deleteInvitationdata } from '@/lib/apis/Invitations';
import type { DashboardInvitationResponse, Invitation } from '@/types/invitations';

const INVITES_PAGE_SIZE = 5;

export default function InvitesEdit() {
  const { currentPage, handlePrev, handleNext, isPrevDisabled } = usePagination();
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const { isOpen, handleModalOpen, handleModalClose: setIsOpen } = useBaseModal();
  const [cancelMessage, setDeleteMessage] = useState<string>('');

  const params = useMemo(
    () => ({
      dashboardId: dashboardId || '',
      page: currentPage,
      size: INVITES_PAGE_SIZE,
    }),
    [dashboardId, currentPage]
  );

  const {
    data: inviteData,
    isLoading,
    refetch,
  } = useQuery<DashboardInvitationResponse>({
    fetchFn: () => getInvitationList(params),
    params,
  });

  const calculatedTotalPages = useMemo(() => {
    const total = inviteData?.totalCount || 0;

    return total === 0 ? 1 : Math.ceil(total / INVITES_PAGE_SIZE);
  }, [inviteData?.totalCount]);

  const isNextDisabled = currentPage >= calculatedTotalPages;
  const invitations: Invitation[] = useMemo(() => inviteData?.invitations || [], [inviteData]);

  const cancelMutation = useMutation<unknown, DeleteInvitationParams>({
    mutationFn: ({ dashboardId, invitationId }) => deleteInvitationdata(dashboardId, invitationId),
    onSuccess: () => {
      setDeleteMessage('초대 취소가 완료되었습니다.');
      handleModalOpen();
      refetch();
    },
  });
  const numericDashboardId: number | null = useMemo(() => {
    if (dashboardId) {
      const numId = Number(dashboardId);
      if (!isNaN(numId)) {
        return numId;
      }
    }
    return null;
  }, [dashboardId]);

  if (numericDashboardId === null) {
    return <div>유효하지 않은 대시보드 ID입니다.</div>;
  }

  const handleCancle = async (dashboardId: number, id: number) => {
    await cancelMutation.mutate({ dashboardId, invitationId: id });
  };
  if (!inviteData) {
    return null;
  }
  const invitesListItems = invitations.map((invitation) => (
    <DashboardItem
      key={invitation.id}
      type='InvitesItem'
      email={invitation.invitee.email}
      id={invitation.id}
      onCancel={() => handleCancle(numericDashboardId, invitation.id)}>
      <DashboardItem.Content
        type='InvitesItem'
        email={invitation.invitee.email}
        id={invitation.id}
        onCancel={() => handleCancle(numericDashboardId, invitation.id)}
      />
      <DashboardItem.Action
        type='InvitesItem'
        email={invitation.invitee.email}
        id={invitation.id}
        onCancel={() => handleCancle(numericDashboardId, invitation.id)}
      />
    </DashboardItem>
  ));

  const skeletonItems = Array(INVITES_PAGE_SIZE)
    .fill(0)
    .map((_, index) => (
      <div key={index} className='border-b border-gray-100 px-5 py-4 sm:px-7'>
        <Skeleton className='h-5 w-full' />
      </div>
    ));

  return (
    <DashboardContainer type='Invites'>
      <DashboardHeader>
        <Title as='h2' size='xl' weight='bold' className='pl-5 sm:pl-7 sm:text-2xl'>
          초대내역
        </Title>
        <PageIndicator currentPage={currentPage} totalPages={calculatedTotalPages} />
        <PageNation
          onPrev={handlePrev}
          onNext={handleNext}
          prevDisabled={isPrevDisabled}
          nextDisabled={isNextDisabled}
          className='rounded-[4px] border border-gray-200'
        />
        <div className='mr-5 sm:mr-7'>
          <InviteButton type='items' />
        </div>
      </DashboardHeader>
      <DashboardBody>
        <DashboardList title='이메일' titleClassName='sm:pl-7 pl-5 pt-[20px] sm:pt-[31px]'>
          <div className='relative min-h-[250px]'>
            {isLoading ? (
              <>{skeletonItems}</>
            ) : invitesListItems.length > 0 ? (
              <>{invitesListItems}</>
            ) : (
              <div className='p-5 text-center text-gray-400'>현재 초대 내역이 없습니다.</div>
            )}
          </div>
        </DashboardList>
      </DashboardBody>
      {isOpen && (
        <BaseModalFrame setOnModal={setIsOpen}>
          <p>{cancelMessage}</p>
        </BaseModalFrame>
      )}
    </DashboardContainer>
  );
}
