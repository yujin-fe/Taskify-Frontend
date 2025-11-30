import { useMemo } from 'react';
import { useParams } from 'react-router';
import PageIndicator from '@/components/common/PageIndicator';
import PageNation from '@/components/common/PageNation';
import Title from '@/components/common/Title';
import DashboardBody from '@/components/dashboard/table/DashboardBody';
import DashboardContainer from '@/components/dashboard/table/DashboardContainer';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import DashboardList from '@/components/dashboard/table/DashboardList';
import Skeleton from '@/components/skeleton/Skeleton';
import { usePagination } from '@/hooks/usePagination';
import useQuery from '@/hooks/useQuery';
import { getInvitationList } from '@/lib/apis/Invitations';
import type { DashboardInvitationResponse, Invitation } from '@/types/invitations';

const INVITES_PAGE_SIZE = 5;

export default function InvitesEdit() {
  const { currentPage, handlePrev, handleNext, isPrevDisabled } = usePagination();
  const { dashboardId } = useParams<{ dashboardId: string }>();

  const params = useMemo(
    () => ({
      dashboardId: dashboardId || '',
      page: currentPage,
      size: INVITES_PAGE_SIZE,
    }),
    [dashboardId, currentPage]
  );

  const { data: inviteData, isLoading } = useQuery<DashboardInvitationResponse>({
    fetchFn: () => getInvitationList(params),
    params,
  });

  const calculatedTotalPages = useMemo(() => {
    const total = inviteData?.totalCount || 0;

    return total === 0 ? 1 : Math.ceil(total / INVITES_PAGE_SIZE);
  }, [inviteData?.totalCount]);

  const isNextDisabled = currentPage >= calculatedTotalPages;
  const invitations: Invitation[] = useMemo(() => inviteData?.invitations || [], [inviteData]);

  const invitesListItems = invitations.map((invitation) => (
    // 임시 div 사용.
    <div key={invitation.id} className='border-b border-gray-100 px-5 py-4 sm:px-7'>
      {invitation.invitee.email}
      {/* 여기에 취소 버튼 등의 UI 추후 추가 */}
    </div>
  ));

  const isUpdating = isLoading && invitations.length > 0;
  const isInitialLoading = isLoading && invitations.length === 0;

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
          className='mr-5 rounded-[4px] border border-gray-200 sm:mr-7'
        />
      </DashboardHeader>
      <DashboardBody>
        <DashboardList title='이메일' titleClassName='sm:pl-7 pl-5 pt-[20px] sm:pt-[31px]'>
          <div className='relative min-h-[250px]'>
            {isInitialLoading ? (
              <>{skeletonItems}</>
            ) : invitesListItems.length > 0 ? (
              <>
                {invitesListItems}

                {isUpdating && <>{skeletonItems}</>}
              </>
            ) : (
              <div className='p-5 text-center text-gray-400'>현재 초대 내역이 없습니다.</div>
            )}
          </div>
        </DashboardList>
      </DashboardBody>
    </DashboardContainer>
  );
}
