import { useState } from 'react';

const useComboboxState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<React.ReactNode | null>(null);

  return { isOpen, setIsOpen, searchQuery, setSearchQuery, selectedNode, setSelectedNode };
};

export default useComboboxState;
