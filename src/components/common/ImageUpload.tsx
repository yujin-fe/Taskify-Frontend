import { useRef, useEffect, useMemo } from 'react';
import Icons from '@/assets/icons';
import { cn } from '@/utils/cn';

type ImageUploadProps = {
  size?: 'Small' | 'Large';
  file?: File | null; // 부모에서 관리하는 상태
  onFileChange?: (file: File | null) => void;
};

export default function ImageUpload({ size = 'Small', onFileChange, file }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  // 파일 선택 버튼 클릭
  const handleButtonClick = () => inputRef.current?.click();

  // 파일 선택 시 부모 상태 업데이트
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onFileChange?.(selectedFile);
  };

  // 이미지 제거
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onFileChange?.(null);
  };

  // value(File)가 바뀔 때 preview 업데이트

  useEffect(() => {
    if (!preview) {
      return;
    }

    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className='relative inline-block h-fit w-fit'>
      <button
        className={cn(
          'flex cursor-pointer items-center justify-center overflow-hidden rounded-md bg-gray-200',
          size === 'Small' && 'h-[58px] w-[58px] sm:h-[76px] sm:w-[76px]',
          size === 'Large' && 'h-[100px] w-[100px] sm:h-[182px] sm:w-[182px]'
        )}
        onClick={handleButtonClick}
        type='button'
        style={{
          backgroundImage: preview ? `url(${preview})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        {!preview && <Icons.Plus className='h-7 w-7 text-violet-500' />}
      </button>

      {preview && (
        <button
          aria-label='삭제 버튼'
          type='button'
          onClick={handleRemoveImage}
          className='absolute top-[6px] right-[6px] flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-gray-600'>
          <Icons.Close className='h-4 w-4 text-gray-0' />
        </button>
      )}

      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleFileChange}
        className='hidden'
      />
    </div>
  );
}
