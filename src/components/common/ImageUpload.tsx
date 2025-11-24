import { useRef, useEffect, useMemo } from 'react';
import Icons from '@/assets/icons';
import { cn } from '@/utils/cn';

type ImageUploadProps = {
  size?: 'Small' | 'Large';
  file?: File | null; // 부모에서 관리하는 상태
  onFileChange?: (file: File | null) => void;
  edit?: boolean;
};

/**
 * ImageUpload 컴포넌트
 *
 * 파일 선택 시 미리보기를 보여주고, 삭제 기능도 포함되어 있습니다.
 * edit=true일 경우, 이미지 위에 검정 반투명 오버레이 + 연필 아이콘 표시
 *
 * @example
 * // 기본 Small 이미지 업로드 폼
 * <ImageUpload
 *   size="Small"
 *   file={imageFile}
 *   onFileChange={setImageFile}
 *   edit={false}
 * />
 *
 * @example
 * // Small 이미지 업로드 + edit 모드
 * <ImageUpload
 *   size="Small"
 *   file={imageFile}
 *   onFileChange={setImageFile}
 *   edit={true}
 * />
 *
 */

export default function ImageUpload({
  size = 'Small',
  onFileChange,
  file,
  edit = false,
}: ImageUploadProps) {
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
          'relative',
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

        {preview && edit && (
          <div className='absolute inset-0 flex items-center justify-center rounded-md bg-gray-900/60'>
            <Icons.Pencil className='h-[22px] w-[22px] text-gray-0 sm:h-[30px] sm:w-[30px]' />
          </div>
        )}
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
