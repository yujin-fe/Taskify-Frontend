import PageIndicator from '@/components/common/PageIndicator';
import PageNation from '@/components/common/PageNation';
import CreateButton from '@/components/dashboard/CreateButton';
import DashboardNameCard from '@/components/mydashboard/DashboardNameCard';
import InvitedDashboard from '@/components/mydashboard/InvitedDashboard';
import { NEW_DASHBOARD } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';
import { usePagination } from '@/hooks/usePagination';
import useQuery from '@/hooks/useQuery';
import { getDashboards } from '@/lib/apis/dashboards';
import { type DashboardsResponse, type GetDashboardsparams } from '@/types/dashboardsData';
const PAGE_SIZE = 5;

export default function MyDashboard() {
  const { currentPage, handlePrev, handleNext, isPrevDisabled } = usePagination();
  const { handleModalOpen } = useModal(NEW_DASHBOARD);

  const params: GetDashboardsparams = {
    navigationMethod: 'pagination',
    page: currentPage,
    size: PAGE_SIZE,
    cursorId: null,
  };

  const {
    data: dashboardsData,
    isLoading,
    error,
  } = useQuery<DashboardsResponse>({
    fetchFn: () => getDashboards(params),
    params,
  });

  //TODO: 에러컴포넌트로 교체
  if (error) {
    return <div>대쉬보드를 불러오는데 실패했습니다.</div>;
  }

  if (!dashboardsData) {
    return null;
  }
  const totalCount = dashboardsData.totalCount;
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      <div className='flex max-w-[1022px] flex-col p-[24px] sm:p-[40px]'>
        <section className='flex max-w-[1022px] flex-col gap-3'>
          <div className='flex h-[388px] flex-col gap-[8px] sm:grid sm:h-[230px] sm:grid-cols-2 sm:grid-rows-3 sm:gap-3 md:gap-2.5 lg:h-[152px] lg:grid-cols-3 lg:grid-rows-2 lg:gap-[13px]'>
            <CreateButton className='h-[58px] font-lg-semibold' onClick={handleModalOpen}>
              새로운 대시보드
            </CreateButton>
            {dashboardsData?.dashboards.map((dashboard) => (
              <DashboardNameCard isLoading={isLoading} key={dashboard.id} dashboard={dashboard} />
            ))}
          </div>
          {totalCount !== 0 && (
            <div className='flex items-center justify-end gap-4'>
              <PageIndicator currentPage={currentPage} totalPages={pageCount} />
              <PageNation
                onPrev={handlePrev}
                onNext={handleNext}
                prevDisabled={isPrevDisabled}
                nextDisabled={currentPage >= pageCount}
                className='bg-gray-0'
              />
            </div>
          )}
        </section>
        <section className='mt-10 h-fit max-w-[1022px] rounded-lg bg-gray-0 pb-2.5'>
          <InvitedDashboard />
        </section>
      </div>
    </>
  );
}
