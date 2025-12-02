import { DUE_DATE, IMAGE_URL } from '@/constants/requestCardData';
import type { UpdateCardType } from '@/lib/apis/cards';
import type { CardDetailResponse, CardEditFormValue } from '@/types/card';
import { formatDueDate } from '@/utils/formatDateTime';

export const updateCardRequestBody = (
  formValue: CardEditFormValue,
  cardDetailData: CardDetailResponse | null,
  imageUrl: string | null,
  currentUserId?: number
): UpdateCardType => {
  const formattedDueDate = formValue.dueDate ? formatDueDate(formValue.dueDate) : DUE_DATE;

  const normalizedTags = formValue.tags && formValue.tags.length > 0 ? formValue.tags : [''];

  const assigneeUserId =
    formValue.assigneeUser?.userId ?? cardDetailData?.assignee.id ?? currentUserId ?? 0;

  return {
    columnId: formValue.columnId,
    assigneeUserId,
    title: formValue.title,
    description: formValue.description,
    dueDate: formattedDueDate,
    tags: normalizedTags,
    imageUrl: imageUrl ?? IMAGE_URL,
  };
};
