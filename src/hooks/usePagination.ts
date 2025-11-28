import { useState, useCallback } from 'react';

/**
 * usePagination 커스텀 훅
 * * 페이지네이션 상태와 이동 로직을 관리하며, 필요한 상태와 핸들러를 반환합니다.
 */
export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  const isPrevDisabled = currentPage === 1;

  return {
    currentPage,
    handlePrev,
    handleNext,
    isPrevDisabled,
  };
};
