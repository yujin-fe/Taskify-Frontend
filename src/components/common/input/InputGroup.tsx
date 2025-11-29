import { isValidElement, Children, cloneElement } from 'react';
import InputField, { type InputFieldProps } from '@/components/common/input/InputField';
import InputPrefixIcon from '@/components/common/input/InputPrefixIcon';
import InputSuffixButton from '@/components/common/input/InputSuffixButton';
import useInputContext from '@/hooks/useInputContext';
import { cn } from '@/utils/cn';

function autoAddToFields(children: React.ReactNode) {
  const hasSuffix = Children.toArray(children).some(
    (c) => isValidElement(c) && c.type === InputSuffixButton
  );

  const hasPrefix = Children.toArray(children).some(
    (c) => isValidElement(c) && c.type === InputPrefixIcon
  );

  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    if (child.type === InputField) {
      return cloneElement(child as React.ReactElement<InputFieldProps>, {
        _hasSuffix: hasSuffix,
        _hasPrefix: hasPrefix,
      });
    }

    return child;
  });
}

interface InputGroupProps {
  children: React.ReactNode;
  className?: string;
}

export default function InputGroup({ children, className }: InputGroupProps) {
  const { hasError, disabled } = useInputContext();

  return (
    <div
      className={cn(
        'relative rounded-[8px] border border-gray-300 bg-gray-0 px-[16px] py-[12px] focus-within:border-primary',
        hasError && 'border-error focus-within:border-error',
        disabled && 'cursor-not-allowed text-gray-400',
        className
      )}>
      {autoAddToFields(children)}
    </div>
  );
}
