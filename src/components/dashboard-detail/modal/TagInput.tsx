import { useState } from 'react';
import Tag from '@/components/dashboard/Tag';
import { getProfileColorForId } from '@/utils/avatar';

interface TagInputProps {
  tags: string[];
  setTags: (nextTags: string[]) => void;
}

export default function TagInput({ tags, setTags }: TagInputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleAddTag = () => {
    const newTag = input.trim();
    if (!newTag) {
      return;
    }
    if (tags.includes(newTag)) {
      setError('이미 포함된 태그입니다.');
      return;
    }

    if (tags.length >= 5) {
      setError('태그는 5개까지 입력할 수 있습니다.');
      return;
    }

    setTags([...tags, newTag]);
    setInput('');
    setError('');
  };

  const handleDelete = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing && input.trim()) {
      e.preventDefault();
      handleAddTag();
    }
    if (e.key === 'Backspace' && input === '' && tags.length > 0) {
      handleDelete(tags[tags.length - 1]);
    }
  };

  return (
    <div className='flex flex-col gap-[4px]'>
      <div className='flex min-h-[48px] w-full flex-wrap items-center gap-[10px] rounded-[8px] border border-gray-300 bg-gray-0 px-[16px] py-[10px] focus-within:border-primary md:max-w-[520px]'>
        {tags.length > 0
          && tags.map((tag, idx) => (
            <Tag key={tag} onDelete={() => handleDelete(tag)} color={getProfileColorForId(idx)}>
              {tag}
            </Tag>
          ))}
        <input
          type='text'
          placeholder='입력 후 Enter'
          className='w-full flex-1 outline-0 placeholder:text-gray-400'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError('');
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      {error && <span className='font-md-medium text-error'>{error}</span>}
    </div>
  );
}
