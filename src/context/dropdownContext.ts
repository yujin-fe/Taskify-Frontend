import { createContext } from 'react';

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

export default DropdownContext;
