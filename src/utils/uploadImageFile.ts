interface UploadImageFileType {
  file: File | null;
  requestFn: (formData: FormData) => Promise<Record<string, string>>;
  key?: string;
}

export const uploadImageFile = async ({ file, requestFn, key = 'image' }: UploadImageFileType) => {
  if (!file) {
    return null;
  }

  const formData = new FormData();
  formData.append(key, file);

  return requestFn(formData);
};
