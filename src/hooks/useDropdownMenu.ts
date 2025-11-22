import { useState } from 'react';

interface useDropdownMenuProps {
  value?: string;
  onValueChange?: React.Dispatch<React.SetStateAction<string>>;
}

const useDropdownMenu = ({ value, onValueChange }: useDropdownMenuProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, handleToggleOpen, value, onValueChange };
};

export default useDropdownMenu;
