import CreateButton from '@/components/dashboard/CreateButton';
import DashboardCard from '@/components/dashboard-detail/card/DashboardCard';
import ColumnContainer from '@/components/dashboard-detail/column/ColumnContainer';
import ColumnInfoHeader from '@/components/dashboard-detail/column/ColumnInfoHeader';

// TODO: 실제 데이터 연결 필요
const cardDataArray = [
  {
    id: 101,
    title: 'Taskify 웹페이지 디자인 리뉴얼',
    description:
      '기존 디자인을 개선하고, 반응형 웹과 모바일 대응을 추가하여 사용자 경험을 향상시킵니다.',
    tags: ['디자인', '프론트엔드', 'UI/UX'],
    dueDate: null,
    assignee: {
      id: 6373,
      nickname: '홍길동',
      profileImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/19-7_6373_1764392042711.png',
    },
    imageUrl:
      'https://file.daesoon.org/webzine/307/202212191656_Daesoon_263_%EB%AC%B8%ED%99%94%EC%82%B0%EC%B1%85_%EC%A0%84%EA%B2%BD%20%EC%86%8D%20%EB%8F%99%EB%AC%BC%20%EA%B3%A0%EC%96%91.jpg',
    teamId: 'team-01',
    columnId: 5,
    createdAt: '2025-11-01T09:15:30.000Z',
    updatedAt: '2025-11-25T15:42:10.000Z',
  },
  {
    id: 102,
    title: 'Taskify 백엔드 API 개발',
    description: '새로운 API 엔드포인트를 설계하고, 기존 데이터베이스 구조와 통합합니다.',
    tags: [
      '백엔드',
      'API',
      '데이터베이스',
      '백엔드',
      'API',
      '데이터베이스',
      '백엔드',
      'API',
      '데이터베이스',
    ],
    dueDate: '2025-12-15',
    assignee: {
      id: 6374,
      nickname: '김철수',
      profileImageUrl: null,
    },
    imageUrl: null,
    teamId: 'team-01',
    columnId: 5,
    createdAt: '2025-11-05T11:30:45.000Z',
    updatedAt: '2025-11-28T14:20:10.000Z',
  },
];

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
          {cardDataArray.map((card) => (
            <DashboardCard key={card.id} cardData={card} />
          ))}
        </div>
      </ColumnContainer>
    </div>
  );
}
