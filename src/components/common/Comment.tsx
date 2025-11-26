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
        className={cn('relative flex max-w-[520px] flex-col gap-4', className)}>
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
      className={cn('font-lg-bold text-gray-700', className)}>
      {children}
    </Label>
  );
}

type FieldProps = {
  className?: string;
  textareaClassName?: string;
};

function Field({ className, textareaClassName }: FieldProps) {
  const { value, onChange, placeholder, textAreaId } = useCommentContext();

  return (
    <fieldset className={cn('relative flex flex-col border-0 p-0', className)}>
      <legend className='sr-only'>댓글 입력</legend>
      <TextArea
        id={textAreaId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn('pr-14 pb-12', textareaClassName)}
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
      theme='primary'
      size='sm'
      type='submit'
      disabled={disabled}
      className={cn('absolute right-3 bottom-3', className)}>
      {children}
    </Button>
  );
}

const Comment = { Root, Title, Field, Submit };
export default Comment;
