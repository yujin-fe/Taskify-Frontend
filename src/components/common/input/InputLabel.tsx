import Label, { type LabelProps } from '@/components/common/Label';
import useInputContext from '@/hooks/useInputContext';

type InputLabelProps = Omit<LabelProps, 'htmlFor'>;

export default function InputLabel({
  children,
  className,
  required = false,
  ...props
}: InputLabelProps) {
  const { id } = useInputContext();

  return (
    <Label htmlFor={id} className={className} required={required} {...props}>
      {children}
    </Label>
  );
}
