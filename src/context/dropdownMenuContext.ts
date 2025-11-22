import { createContext } from 'react';

interface DropdownMenuContextType {
  isOpen: boolean;
  handleToggleOpen: () => void;
}

export const DropdownMenuContext = createContext({} as DropdownMenuContextType);
