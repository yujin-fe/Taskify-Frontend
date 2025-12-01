import React, { createContext, useContext, useId, useMemo } from 'react';
import Label from '@/components/common/Label';
import { cn } from '@/utils/cn';
import Button from './Button';
import TextArea from './TextArea';

type CommentContextValue = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  textAreaId: string;
};

const CommentContext = createContext<CommentContextValue | null>(null);

const useCommentContext = () => {
  const ctx = useContext(CommentContext);
  if (!ctx) {
    throw new Error('Comment components must be used within <Comment.Root>');
  }
  return ctx;
};

type RootProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

function Root({
  value,
  onChange,
  onSubmit,
  placeholder = '댓글 작성하기',
  disabled,
  className,
  children,
}: RootProps) {
  const textAreaId = useId();

  const contextValue = useMemo(
    () => ({
      value,
      onChange,
      onSubmit,
      placeholder,
      disabled: disabled ?? !value.trim(),
      textAreaId,
    }),
    [value, onChange, onSubmit, placeholder, disabled, textAreaId]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contextValue.disabled) {
      onSubmit();
    }
  };

  return (
    <CommentContext value={contextValue}>
      <form
        onSubmit={handleSubmit}
        className={cn('relative flex w-full max-w-[520px] flex-col gap-[4px]', className)}>
        {children}
      </form>
    </CommentContext>
  );
}

type TitleProps = {
  children?: React.ReactNode;
  className?: string;
  required?: boolean;
};

function Title({ children = '댓글', className, required }: TitleProps) {
  const { textAreaId } = useCommentContext();
  return (
    <Label
      htmlFor={textAreaId}
      required={required}
      className={cn('font-md-medium text-gray-700 sm:font-lg-medium', className)}>
      {children}
    </Label>
  );
}

type FieldProps = {
  className?: string;
};

function Field({ className }: FieldProps) {
  const { value, onChange, placeholder, textAreaId } = useCommentContext();

  return (
    <fieldset className={cn('flex flex-col border-0 p-0 sm:h-[110px]', className)}>
      <legend className='sr-only'>댓글 입력</legend>
      <TextArea
        id={textAreaId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='scrollbar-hidden h-[70px] pr-[110px] font-xs-regular placeholder:font-xs-regular sm:h-[110px] sm:pr-[85px] sm:pb-12 sm:font-md-regular sm:placeholder:font-lg-regular'
      />
    </fieldset>
  );
}

type SubmitProps = {
  children?: React.ReactNode;
  className?: string;
};

function Submit({ children = '입력', className }: SubmitProps) {
  const { disabled } = useCommentContext();
  return (
    <Button
      theme='secondary'
      size='sm'
      type='submit'
      disabled={disabled}
      className={cn(
        'absolute right-[12px] bottom-[12px]',
        'disabled:bg-gray-200 disabled:text-gray-400',
        className
      )}>
      {children}
    </Button>
  );
}

const Comment = { Root, Title, Field, Submit };
export default Comment;
