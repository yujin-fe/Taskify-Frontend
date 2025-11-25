import { useContext } from 'react';
import { FormModalContext } from '@/context/formModalContext';
export default function FormModalForm({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: () => void;
}) {
  const { handleModalClose } = useContext(FormModalContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
    handleModalClose();
  };
  return <form onSubmit={handleSubmit}>{children}</form>;
}
