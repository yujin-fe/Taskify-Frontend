import { cva, type VariantProps } from 'class-variance-authority';
import FormModalBody from '@/components/common/modal/FormModalBody';
import FormModalFooter from '@/components/common/modal/FormModalFooter';
import FormModalTitle from '@/components/common/modal/FormModalTitle';
import ModalPortal from '@/components/common/modal/ModalPortal';
import { FormModalContext } from '@/context/FormModalContext';
import { cn } from '@/utils/cn';

const FormModalFrameStyle = cva(`flex flex-col bg-gray-0 rounded-2xl`, {
  variants: {
    size: {
      lg: 'sm:p-[32px] p-[24px]',
      md: 'sm:p-[24px] py-[24px] px-[16px] rounded-lg w-[327px]',
    },
    gap: {
      32: 'gap-[32px]',
      24: 'gap-[24px]',
    },
  },
  defaultVariants: {
    size: 'lg',
    gap: 32,
  },
});

interface FormModalProps extends VariantProps<typeof FormModalFrameStyle> {
  className?: string;
  children: React.ReactNode;
  modal: {
    isOpen: boolean;
    handleModalOpen: () => void;
    handleModalClose: () => void;
  };
}

/**
 * <form> 태그의 위치에 따라 FormModal.Body와 FormModal.Footer를 사용해주세요.
 *
 * padding 값은 size에 따라 자동으로 적용됩니다.
 *
 * - size="lg": 기본 패딩 32px (모바일 24px)
 * - size="md": 기본 패딩 24px (모바일 24px 16px)
 *
 * gap은 Title ↔ Body 사이 간격을 의미합니다.
 *
 * cancleButton을 클릭하면 modal.handleModalClose()가 실행되어 isOpen이 false가 됩니다.
 * submitButton을 클릭하면 form이 제출됩니다.
 *
 * ⚠️ 아래 예시처럼 `modal`(useModal의 반환 객체)를 반드시 prop으로 전달해주세요.
 *
 * @example
 * const modal = useModal();
 *
 * {modal.isOpen && (
 *   <FormModal size="lg" gap={32} modal={modal}>
 *     <FormModal.Title title="할일 생성" />
 *     <form>
 *       <FormModal.Body>
 *         <NewTaskForm />
 *       </FormModal.Body>
 *       <FormModal.Footer cancleButton="취소" submitButton="생성" />
 *     </form>
 *   </FormModal>
 * )}
 *
 * <button onClick={modal.handleModalOpen}>열기</button>
 */

export default function FormModal({ size, gap, children, className, modal }: FormModalProps) {
  const finalSize = size ?? 'lg';
  return (
    <FormModalContext value={{ finalSize, ...modal }}>
      <ModalPortal>
        <div className='modal-dimmed'>
          <div className={cn(FormModalFrameStyle({ size, gap }), className)}>{children}</div>
        </div>
      </ModalPortal>
    </FormModalContext>
  );
}

//title 프롭스로 모달의 타이틀 작성
FormModal.Title = FormModalTitle;

//자식으로 폼 전달
FormModal.Body = FormModalBody;

//자식으로 왼쪽 버튼과 오른쪽 버튼에 들어갈 텍스트 입력
FormModal.Footer = FormModalFooter;
