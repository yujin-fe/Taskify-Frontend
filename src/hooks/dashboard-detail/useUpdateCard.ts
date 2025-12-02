import useMutation from '@/hooks/useMutation';
import { updateCard, type UpdateCardType } from '@/lib/apis/cards';
import type { CardDetailResponse } from '@/types/card';

interface UseUpdateCardOptions {
  onSuccess?: (updated: CardDetailResponse) => void;
}

const useUpdateCard = ({ onSuccess }: UseUpdateCardOptions = {}) => {
  return useMutation<CardDetailResponse, { id: number; body: UpdateCardType }>({
    mutationFn: ({ id, body }) => updateCard(id, body),
    onSuccess: (updated) => {
      if (!updated) {
        return;
      }
      onSuccess?.(updated);
    },
  });
};

export default useUpdateCard;
