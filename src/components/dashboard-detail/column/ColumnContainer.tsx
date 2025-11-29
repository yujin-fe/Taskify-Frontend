export default function ColumnContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex w-full flex-shrink-0 border-gray-200 md:h-[calc(100dvh-70px)] md:basis-[354px] md:border-r'>
      <div className='flex h-full w-full flex-col overflow-y-visible p-[20px] md:overflow-y-auto'>
        {children}
      </div>
    </div>
  );
}
