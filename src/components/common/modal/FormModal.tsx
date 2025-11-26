import { cva, type VariantProps } from 'class-variance-authority';
import FormModalBody from '@/components/common/modal/FormModalBody';
import FormModalFooter from '@/components/common/modal/FormModalFooter';
import FormModalForm from '@/components/common/modal/FormModalForm';
import FormModalTitle from '@/components/common/modal/FormModalTitle';
import ModalPortal from '@/components/common/modal/ModalPortal';
import { FormModalContext } from '@/context/formModalContext';
import { useModal } from '@/hooks/useModal';
import { cn } from '@/utils/cn';

const FormModalFrameStyle = cva(`flex flex-col bg-gray-0 rounded-2xl`, {
  variants: {
    size: {
      lg: 'sm:p-[32px] sm:w-fit p-[24px] mx-[24px] w-full',
      md: 'sm:p-[24px] sm:w-fit w-full py-[24px] px-[16px] rounded-lg mx-[24px]',
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
  modalName: string;
  closeBtn?: boolean;
}

/**
 * - size="lg": 기본 패딩 32px (모바일 24px)
 * - size="md": 기본 패딩 24px (모바일 16px)
 * - 닫힘 아이콘이 따로 있다면 closeBtn=true 프롭으로 명시
 * - gap은 Title ↔ Form 사이 간격을 의미합니다.
 *
 * ⚠️ 아래 예시처럼 useModal의 인수와 FormModal의 modalName은 일치해야 합니다!!
 *
 * 각각의 모달마다 고유한 이름을 부여해주세요.
 * - 예시: "newTaskModal", "addColumnModal"
 *
 * @example
 * const { handleModalOpen, handleModalClose } = useModal("newTaskModal");
 *
 * <FormModal size="lg" gap={32} modalName="newTaskModal">
 *   <FormModal.Title title="할일 생성" />
 *   <FormModal.Form onSubmit={(e) => {
 *     const formData = new FormData(e.currentTarget);
 *     console.log(formData.get('input'));
 *   }}>
 *     <FormModal.Body>
 *       <input name="input" />
 *     </FormModal.Body>
 *     <FormModal.Footer>
 *       <Button theme="outlined" onClick={handleModalClose}>
 *         취소
 *       </Button>
 *       <Button type="submit">생성</Button>
 *     </FormModal.Footer>
 *   </FormModal.Form>
 * </FormModal>
 *
 * <button onClick={handleModalOpen}>열기</button>
 */

export default function FormModal({
  size,
  gap,
  children,
  className,
  modalName,
  closeBtn = false,
}: FormModalProps) {
  const finalSize = size ?? 'lg';
  const modal = useModal(modalName);
  return (
    <FormModalContext value={{ finalSize, ...modal, closeBtn }}>
      <ModalPortal>
        {modal.isOpen && (
          <div className='modal-dimmed'>
            <div
              role='dialog'
              aria-modal='true'
              tabIndex={0}
              className={cn(FormModalFrameStyle({ size, gap }), className)}>
              {children}
            </div>
          </div>
        )}
      </ModalPortal>
    </FormModalContext>
  );
}

//title 프롭스로 모달의 타이틀 작성
FormModal.Title = FormModalTitle;

//자식으로는 FormModal.Body FormModal.Footer를 받습니다.
FormModal.Form = FormModalForm;

//자식으로는 폼태그 내부의 내용을 입력받습니다.
FormModal.Body = FormModalBody;

//자식는 폼태그에 들어갈 버튼들을 받습니다.
FormModal.Footer = FormModalFooter;
