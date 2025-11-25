import React from 'react';
import { cn } from '@/utils/cn';

interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function TextArea({ className, value, onChange, error, ...props }: TextAreaProps) {
  return (
    <div className='flex max-w-[520px] flex-col gap-1'>
      <textarea
        className={cn(
          'bg-white min-h-[126px] w-full resize-none rounded-lg border border-gray-300 px-4 py-3',
          'text-gray-900 placeholder:font-lg-regular placeholder:text-gray-400',
          'focus:border-primary focus:outline-none',
          error && 'border-red-500',
          className
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
}
