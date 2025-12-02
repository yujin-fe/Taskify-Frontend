import { createContext } from 'react';
import type {
  StatusComboboxValue,
  UserComboboxValue,
} from '@/components/dashboard/combobox/Combobox';

interface ComboboxContextType {
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedValue: UserComboboxValue | StatusComboboxValue | null;
  setSelectedValue: (value: UserComboboxValue | StatusComboboxValue | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ComboboxContext = createContext<ComboboxContextType | null>(null);

export default ComboboxContext;
