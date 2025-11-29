import { api, fileApi } from '@/lib/axios';

interface ChangeUserInfoType {
  nickname: string;
  profileImageUrl?: string | null;
}

/** 내 정보 조회 api */
export const getUsersMe = async () => {
  const res = await api.get('/users/me');
  return res.data;
};

/** 내 정보 수정 api */
export const changeUserMe = async (changeUserInfo: ChangeUserInfoType) => {
  const res = await api.put('/users/me', changeUserInfo);
  return res.data;
};

/** 프로필 이미지 업로드 api */
export const uploadImage = async (image: FormData) => {
  const res = await fileApi.post('/users/me/image', image);
  return res.data;
};
