import { createContext } from 'react';

interface ComboboxContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedNode: null | React.ReactNode;
  setSelectedNode: (node: null | React.ReactNode) => void;
}

const ComboboxContext = createContext<ComboboxContextType | null>(null);

export default ComboboxContext;
