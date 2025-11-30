import { cardUploadImageFile } from '@/lib/apis/cards';
import { uploadImageFile } from '@/utils/uploadImageFile';

export const uploadCardImage = async (columnId: number, file: File | null) => {
  if (!file) {
    return null;
  }

  try {
    const uploadFn = cardUploadImageFile(columnId);

    const res = await uploadImageFile({
      file,
      requestFn: uploadFn,
    });

    return res?.imageUrl ?? null;
  } catch (error) {
    throw new Error('이미지 업로드 중 오류가 발생했습니다.', { cause: error });
  }
};
