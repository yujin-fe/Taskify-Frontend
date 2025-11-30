import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export const useModal = (modalName: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isOpen = searchParams.get(modalName) === 'true';

  useEffect(() => {
    const hasAnyModalOpen = Array.from(searchParams.values()).some((value) => value === 'true');
    if (hasAnyModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleModalOpen = () => {
    setSearchParams((prev) => {
      prev.set(modalName, 'true');
      return prev;
    });
  };

  const handleModalClose = () => {
    setSearchParams((prev) => {
      prev.delete(modalName);
      return prev;
    });
  };

  const handleModalOpenOnly = () => {
    setSearchParams({ [modalName]: 'true' });
  };

  const handleModalCloseAll = () => {
    setSearchParams({});
  };

  return {
    modalName,
    isOpen,
    handleModalOpen,
    handleModalClose,
    handleModalOpenOnly,
    handleModalCloseAll,
  };
};
