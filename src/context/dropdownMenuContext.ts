import { createContext } from 'react';

interface DropdownMenuContextType {
  isOpen: boolean;
  handleToggleOpen: () => void;
  value?: string;
  onValueChange?: React.Dispatch<React.SetStateAction<string>>;
}

export const DropdownMenuContext = createContext({} as DropdownMenuContextType);
