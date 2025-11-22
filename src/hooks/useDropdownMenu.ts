import { useState } from 'react';

const useDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, handleToggleOpen };
};

export default useDropdownMenu;
