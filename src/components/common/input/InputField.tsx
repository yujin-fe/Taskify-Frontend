import useInputContext from '@/hooks/useInputContext';
import { cn } from '@/utils/cn';

export interface InputFieldProps extends React.ComponentProps<'input'> {
  _hasSuffix?: boolean;
}

export default function InputField({ _hasSuffix, ...props }: InputFieldProps) {
  const { id, value, onChange, onBlur, disabled } = useInputContext();

  return (
    <input
      id={id}
      value={value}
      onChange={(e) => !disabled && onChange?.(e.target.value)}
      onBlur={(e) => !disabled && onBlur?.(e.target.value)}
      disabled={disabled}
      {...props}
      className={cn(
        'w-full outline-0 placeholder:text-gray-400',
        disabled && 'cursor-not-allowed',
        _hasSuffix && 'pr-[36px]',
        props.className
      )}
    />
  );
}
