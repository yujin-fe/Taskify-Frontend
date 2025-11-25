import { useId } from 'react';
import InputErrorMessage from '@/components/common/input/InputErrorMessage';
import InputField from '@/components/common/input/InputField';
import InputFieldDate from '@/components/common/input/InputFieldDate';
import InputGroup from '@/components/common/input/InputGroup';
import InputLabel from '@/components/common/input/InputLabel';
import InputPrefixIcon from '@/components/common/input/InputPrefixIcon';
import InputSuffixButton from '@/components/common/input/InputSuffixButton';
import { InputContext } from '@/context/inputContext';

interface InputProps {
  children: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  value: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

/**
 * Input 컴포넌트
 *
 * 공통 입력 컨테이너 컴포넌트입니다.
 * 내부에 Label, Group, Field, FieldDate, SuffixButton, ErrorMessage 등을 포함할 수 있으며,
 * Context를 통해 하위 컴포넌트에 id, value, onChange, onBlur, disabled, hasError 정보를 제공합니다.
 *
 * @example
 * <Input value={formData.email} onChange={handleChange('email')} error={!!errors.email}>
 *   <Input.Label>이메일</Input.Label>
 *   <Input.Group>
 *     <Input.Field placeholder="이메일을 입력하세요" />
 *   </Input.Group>
 *   <Input.ErrorMessage>{errors.email}</Input.ErrorMessage>
 * </Input>
 */
export default function Input({
  children,
  disabled = false,
  error,
  value,
  onChange,
  onBlur,
}: InputProps) {
  const id = useId();

  return (
    <InputContext value={{ id, hasError: error, value, onChange, onBlur, disabled }}>
      <div className='flex w-full flex-col gap-[8px]'>{children}</div>
    </InputContext>
  );
}

/**
 * InputLabel 컴포넌트
 *
 * 공통 라벨 컴포넌트로, Input.Field와 함께 사용됩니다.
 * required 속성을 주면 '*' 표시가 붙습니다.
 *
 * @example
 * <Input.Label required>이메일</Input.Label>
 */
Input.Label = InputLabel;

/**
 * InputGroup 컴포넌트
 *
 * Input.Field, Input.FieldDate, Input.SuffixButton 등을 감싸서
 * border, padding, focus 상태 등을 관리하는 그룹 컨테이너입니다.
 *
 * @example
 * <Input.Group>
 *   <Input.Field />
 * </Input.Group>
 */
Input.Group = InputGroup;

/**
 * InputField 컴포넌트
 *
 * 일반 텍스트, 이메일, 비밀번호 등의 입력을 처리하는 인풋 필드입니다.
 * InputContext에서 value, onChange, disabled 등을 받아와 사용합니다.
 *
 * @example
 * <Input.Field placeholder="이메일을 입력하세요" type='email' />
 */
Input.Field = InputField;

/**
 * InputFieldDate 컴포넌트
 *
 * 날짜/시간 입력 전용 필드로 캘린더 아이콘과 플레이스홀더 표시 기능이 내장되어 있습니다.
 * 실제 input[type="datetime-local"]은 투명하게 배치되고, 클릭 시 달력 UI가 나타납니다.
 *
 * @example
 * <Input.FieldDate placeholder="마감일을 선택해주세요" />
 */
Input.FieldDate = InputFieldDate;

/**
 * InputPrefixIcon 컴포넌트
 *
 * InputField 좌측에 위치하는 아이콘 컴포넌트입니다.
 * 예: 검색 아이콘
 *
 * @example
 * <Input.PrefixIcon>
 *   <Icons.Search />
 * </Input.PrefixIcon>
 */
Input.PrefixIcon = InputPrefixIcon;

/**
 * InputSuffixButton 컴포넌트
 *
 * InputField 우측에 위치하는 버튼 컴포넌트입니다.
 * 예: 비밀번호 표시 토글
 *
 * @example
 * <Input.SuffixButton onClick={handleTogglePassword}>
 *   <Icons.PasswordShow />
 * </Input.SuffixButton>
 */
Input.SuffixButton = InputSuffixButton;

/**
 * InputErrorMessage 컴포넌트
 *
 * 입력값 검증 후 에러 메시지를 표시합니다.
 * 메시지가 없으면 렌더링되지 않습니다.
 *
 * @example
 * <Input.ErrorMessage>{errors.email}</Input.ErrorMessage>
 */
Input.ErrorMessage = InputErrorMessage;
