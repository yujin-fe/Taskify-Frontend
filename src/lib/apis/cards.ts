import { api, fileApi } from '@/lib/axios';

export interface CreateCardType {
  assigneeUserId: number | null;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string | null;
  tags: string[];
  imageUrl: string | null;
}

/** 카드(할일) 생성 api */
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
