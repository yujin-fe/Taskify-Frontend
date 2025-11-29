export default function CardStatusBadge({ title }: { title: string }) {
  return (
    <div className='flex h-[32px] w-fit items-center gap-[6px] rounded-[16px] bg-violet-500-8 px-[10px] select-none'>
      <div className='h-[6px] w-[6px] rounded-full bg-primary' />
      <span className='text-primary'>{title}</span>
    </div>
  );
}
