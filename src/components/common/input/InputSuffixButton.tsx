import useInputContext from '@/hooks/useInputContext';

interface InputSuffixButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}

export default function InputSuffixButton({
  children,
  onClick,
  ariaLabel,
}: InputSuffixButtonProps) {
  const { disabled } = useInputContext();

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      type='button'
      onClick={onClick}
      className='absolute top-[50%] right-[12px] translate-y-[-50%] cursor-pointer text-gray-400 disabled:cursor-not-allowed'>
      {children}
    </button>
  );
}
