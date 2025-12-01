import useQuery from '@/hooks/useQuery';
import { getCardDetail } from '@/lib/apis/cards';
import type { CardDetailResponse } from '@/types/card';

const useCardDetail = (cardId: number) => {
  return useQuery<CardDetailResponse, { cardId: number }>({
    fetchFn: () => getCardDetail(cardId),
    params: { cardId },
  });
};

export default useCardDetail;
