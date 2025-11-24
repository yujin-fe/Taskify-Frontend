/**
 * 콤보박스에서 메뉴 검색 시 콤보박스 아이템이 검색어와 일치하는지 확인하는 유틸 함수입니다.
 *
 * - 검색 문자열(`query`)이 비어있으면 항상 `true`를 반환하여 모든 항목을 표시합니다.
 * - 검색 문자열이 존재하면, 항목 값(`value`)이 검색 문자열을 포함하는지 여부를 반환합니다.
 */
export const matchSearch = (value: string, query: string) => {
  if (!query) {
    return true;
  }
  return value.toLowerCase().includes(query.toLowerCase());
};
