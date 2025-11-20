import { COLORS } from '@/constants/color';

/**
 * getMonogram
 * 유저 닉네임 첫번째 글자를 리턴하는 함수입니다.
 * */
export const getMonogram = (nickname: string) => {
  if (!nickname) {
    return '';
  }
  return nickname[0];
};

/**
 * getProfileColorForId
 * 유저 id값을 기준으로 프로필 배경 컬러값을 결정하는 함수입니다.
 * orange, blue, green, pink, purple 문자열이 리턴됩니다.
 * */
export const getProfileColorForId = (userId: number) => {
  const idx = userId % COLORS.length;
  return COLORS[idx];
};
