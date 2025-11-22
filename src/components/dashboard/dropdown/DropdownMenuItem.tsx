export default function DropdownMenuItem({ children }: { children: React.ReactNode }) {
  return (
    <li className='dropdown-menu-item-base py-1 text-center font-md-regular hover:bg-violet-500-8 hover:text-violet-500'>
      {children}
    </li>
  );
}
