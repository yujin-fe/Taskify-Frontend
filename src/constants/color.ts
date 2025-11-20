/**
 * 태그, 프로필폴백, 대시보드 생성에서 사용하는 컬러입니다.
 */
export const COLORS = ['orange', 'blue', 'green', 'pink', 'purple'] as const;
export type ColorTypes = (typeof COLORS)[number];
