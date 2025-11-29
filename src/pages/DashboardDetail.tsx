import CreateButton from '@/components/dashboard/CreateButton';
import ColumnContainer from '@/components/dashboard-detail/column/ColumnContainer';
import ColumnInfoHeader from '@/components/dashboard-detail/column/ColumnInfoHeader';

export default function DashboardDetail() {
  return (
    <div className='scrollbar-hidden flex flex-col overflow-hidden md:flex-row md:overflow-x-auto'>
      <ColumnContainer>
        {/* TODO: 실제 데이터 연결 및 함수 연결 */}
        <ColumnInfoHeader
          title='To do'
          totalCount={5}
          onClick={() => console.log('컬럼 수정 모달')}
        />
        <div className='flex flex-col gap-[16px]'>
          <CreateButton onClick={() => console.log('할일 생성 모달')} />
        </div>
      </ColumnContainer>
    </div>
  );
}
