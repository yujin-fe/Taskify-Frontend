const ACCESS_TOKEN_KEY = 'accessToken';

/**
 * 로컬 스토리지에 저장한 `accessToken`을 가져오는 함수
 */
export const getAccessToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  return token;
};

/**
 * 로컬 스토리지에 `accessToken`을 저장하는 함수
 */
export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

/**
 * 로컬 스토리지에 저장된 `accessToken`을 삭제하는 함수
 */
export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};
