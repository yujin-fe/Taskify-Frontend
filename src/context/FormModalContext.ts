import { createContext } from 'react';

interface FormModalContextType {
  finalSize: 'lg' | 'md';
  isOpen: boolean;
  handleModalOpen: () => void;
  handleModalClose: () => void;
}

export const FormModalContext = createContext({} as FormModalContextType);
