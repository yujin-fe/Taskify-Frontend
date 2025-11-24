import { isValidElement, Children, cloneElement } from 'react';
import InputField, { type InputFieldProps } from '@/components/common/input/InputField';
import InputSuffixButton from '@/components/common/input/InputSuffixButton';
import useInputContext from '@/hooks/useInputContext';
import { cn } from '@/utils/cn';

function autoAddSuffixToFields(children: React.ReactNode) {
  const hasSuffix = Children.toArray(children).some(
    (c) => isValidElement(c) && c.type === InputSuffixButton
  );

  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    if (child.type === InputField) {
      return cloneElement(child as React.ReactElement<InputFieldProps>, { _hasSuffix: hasSuffix });
    }

    return child;
  });
}

export default function InputGroup({ children }: { children: React.ReactNode }) {
  const { hasError, disabled } = useInputContext();

  return (
    <div
      className={cn(
        'relative rounded-[8px] border border-gray-300 bg-gray-0 px-[16px] py-[12px] focus-within:border-primary',
        hasError && 'border-error focus-within:border-error',
        disabled && 'cursor-not-allowed text-gray-400'
      )}>
      {autoAddSuffixToFields(children)}
    </div>
  );
}
