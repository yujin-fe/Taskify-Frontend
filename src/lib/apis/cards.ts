import { api, fileApi } from '@/lib/axios';

interface ChangeCardType {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string | null;
  tags: string[];
  imageUrl: string | null;
}

export interface CreateCardType extends ChangeCardType {
  dashboardId: number;
}

interface GetCardDataParams {
  size: number;
  cursorId?: null | number;
  columnId: number;
}

/** 카드(할 일) 생성 api */
export const createCard = async (reqBody: CreateCardType) => {
  const res = await api.post('/cards', reqBody);
  return res;
};

/** 카드 이미지 업로드 api */
export const cardUploadImageFile = (columnId: number) => async (image: FormData) => {
  const res = await fileApi.post(`/columns/${columnId}/card-image`, image);
  return {
    imageUrl: res.data.imageUrl,
  };
};

/** 카드 목록 조회 api */
export const getCardData = async (params: GetCardDataParams) => {
  const { size = 10, columnId, cursorId = null } = params;
  const res = await api.get('/cards', {
    params: {
      size,
      columnId,
      cursorId,
    },
  });
  return res.data;
};

/** 카드(할 일) 수정 api */
export const changeCard = async (cardId: number, reqBody: ChangeCardType) => {
  const res = await api.put(`/cards/${cardId}`, reqBody);
  return res;
};
