export default function FormModalForm({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: () => Promise<void>;
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit();
  };
  return <form onSubmit={handleSubmit}>{children}</form>;
}
