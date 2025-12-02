import { useEffect } from 'react';
import CreateButton from '@/components/dashboard/CreateButton';
import DashboardCard from '@/components/dashboard-detail/card/DashboardCard';
import ColumnInfoHeader from '@/components/dashboard-detail/column/ColumnInfoHeader';
import CreateCardModal from '@/components/dashboard-detail/modal/CreateCardModal';
import Skeleton from '@/components/skeleton/Skeleton';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useModal } from '@/hooks/useModal';
import useMutation from '@/hooks/useMutation';
import useUserContext from '@/hooks/useUserContext';
import { createCard, getCardListData, type CreateCardType } from '@/lib/apis/cards';
import type { CardDetailResponse, CardInitialValueType, CardsResponse } from '@/types/card';
import type { ColumnsData, ColumnsResponse } from '@/types/column';
import type { MembersResponse } from '@/types/members';
import { createCardRequestBody } from '@/utils/card/createCardRequestBody';
import { uploadCardImage } from '@/utils/card/uploadCardImage';

interface ColumnCardListProps {
  column: ColumnsData;
  columnListData: ColumnsResponse | null;
  dashboardId: string;
  memberData: MembersResponse | null;
  onHeaderClick: () => void;
  onRegisterRefetch: (columnId: number, fn: () => void) => void;
  onCardMoved: (fromColumnId: number, toColumnId: number) => void;
}

const CARD_LIST_SIZE = 5;

export default function ColumnCardList({
  column,
  dashboardId,
  memberData,
  onHeaderClick,
  columnListData,
  onRegisterRefetch,
  onCardMoved,
}: ColumnCardListProps) {
  const { userProfile } = useUserContext();
  const CREATE_MODAL_NAME = `CREATE_CARD_${column.id}`;
  const createCardModal = useModal(CREATE_MODAL_NAME);

  const {
    data: infiniteData,
    setData: infiniteSetData,
    isLoading,
    error,
    lastItemRef,
    resetData,
  } = useInfiniteScroll<CardsResponse, { size: number; columnId: number }>({
    fetchFn: (params) => getCardListData(params),
    params: { size: CARD_LIST_SIZE, columnId: column.id },
    onSuccess: (prev, next) => {
      if (!prev) {
        return next;
      }
      return {
        ...next,
        cards: [...prev.cards, ...next.cards],
        totalCount: next.totalCount,
      };
    },
  });

  useEffect(() => {
    onRegisterRefetch(column.id, resetData);
  }, [column.id, onRegisterRefetch, resetData]);

  const createCardMutation = useMutation({
    mutationFn: (reqBody: CreateCardType) => createCard(reqBody),
    onSuccess: (newCard) => {
      createCardModal.handleModalClose();

      infiniteSetData((prev) => {
        if (!prev) {
          return prev;
        }
        return {
          ...prev,
          cards: [...prev.cards, newCard],
          totalCount: prev.totalCount + 1,
        };
      });
    },
  });

  if (isLoading && !infiniteData) {
    return (
      <div className='flex flex-col gap-[16px]'>
        <Skeleton className='mb-[8px] h-[24px] w-[120px] rounded' />
        <Skeleton className='flex flex-col overflow-hidden rounded-[6px] p-[18px] pb-[6px] select-none sm:flex-row sm:items-center sm:px-[20px] sm:py-[16px] md:max-w-[314px] md:flex-col md:items-start' />
      </div>
    );
  }

  if (!infiniteData || !memberData) {
    return null;
  }

  // TODO: 오류 컴포넌트 구현
  if (error) {
    return <div>오류가 발생했습니다.</div>;
  }

  // card handler
  const handleSubmitCreateCard = async (
    formValue: CardInitialValueType,
    imageFile: File | null
  ) => {
    const imageUrl = await uploadCardImage(column.id, imageFile);
    const reqBody = createCardRequestBody(
      formValue,
      column.id,
      dashboardId,
      imageUrl,
      userProfile?.id
    );
    await createCardMutation.mutate(reqBody);
  };
  const handleUpdateCard = (updated: CardDetailResponse) => {
    let fromColumnId: number | null = null;
    let toColumnId: number | null = null;

    infiniteSetData((prev) => {
      if (!prev) {
        return prev;
      }

      const oldCard = prev.cards.find((c) => c.id === updated.id);
      if (!oldCard) {
        return prev;
      }

      if (oldCard.columnId === updated.columnId) {
        return {
          ...prev,
          cards: prev.cards.map((c) => (c.id === updated.id ? updated : c)),
        };
      }

      fromColumnId = oldCard.columnId;
      toColumnId = updated.columnId;

      return {
        ...prev,
        cards: prev.cards.filter((c) => c.id !== updated.id),
        totalCount: prev.totalCount - 1,
      };
    });

    if (fromColumnId !== null && toColumnId !== null) {
      onCardMoved(fromColumnId, toColumnId);
    }
  };

  const handleDeleteCard = (cardId: number) => {
    infiniteSetData((prev) => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        cards: prev.cards.filter((c) => c.id !== cardId),
        totalCount: prev.totalCount - 1,
      };
    });
  };

  const { cards, totalCount } = infiniteData;

  return (
    <>
      <ColumnInfoHeader title={column.title} totalCount={totalCount} onClick={onHeaderClick} />
      <CreateButton
        className='mb-[16px] min-h-[40px]'
        onClick={() => {
          createCardMutation.reset();
          createCardModal.handleModalOpen();
        }}
      />
      <ul className='flex flex-col gap-[16px]'>
        {cards.map((card, index) => {
          const isLast = index === cards.length - 1;
          return (
            <li key={card.id} ref={isLast ? lastItemRef : undefined}>
              <DashboardCard
                columnTitle={column.title}
                columnId={column.id}
                cardData={card}
                onDeleteCard={() => handleDeleteCard(card.id)}
                onUpdateCard={handleUpdateCard}
                memberData={memberData}
                columnListData={columnListData}
              />
            </li>
          );
        })}
      </ul>

      {/* 할 일 생성 모달 */}
      {createCardModal.isOpen && (
        <CreateCardModal
          modalName={CREATE_MODAL_NAME}
          serverErrorMessage={createCardMutation.error}
          onSubmit={handleSubmitCreateCard}
          memberData={memberData}
        />
      )}
    </>
  );
}
