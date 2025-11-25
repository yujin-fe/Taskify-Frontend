import { createContext } from 'react';

interface FormModalContextType {
  finalSize: 'lg' | 'md';
  isOpen: boolean;
  handleModalOpen: () => void;
  handleModalClose: () => void;
  closeBtn: boolean;
}

export const FormModalContext = createContext({} as FormModalContextType);
