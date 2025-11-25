// @/hooks/usePagination.ts

import { useState, useCallback } from 'react';

type PaginationResult = {
  currentPage: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
};

/**
 * usePagination 커스텀 훅
 * * 페이지네이션 상태와 이동 로직을 관리하며, 필요한 상태와 핸들러를 반환합니다.
 *
 * @param {number} totalPages - 전체 페이지 수.
 */
export const usePagination = (totalPages: number): PaginationResult => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return {
    currentPage,
    totalPages,
    handlePrev,
    handleNext,
    isPrevDisabled,
    isNextDisabled,
  };
};
