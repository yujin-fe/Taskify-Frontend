export default function DropdownMenuItem({ children }: { children: React.ReactNode }) {
  return (
    <li className='cursor-pointer rounded-sm px-4 py-1 text-center font-md-regular text-gray-700 select-none hover:bg-violet-500-8 hover:text-violet-500'>
      {children}
    </li>
  );
}
