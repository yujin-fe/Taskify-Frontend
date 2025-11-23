import Button from '@/components/common/Button';
import ModalPortal from '@/components/common/modal/ModalPortal';
import { cn } from '@/utils/cn';

type BaseModalFrameProps = {
  size?: 'Login' | 'Account'; // Login: 로그인 페이지 Account: 계정 관리 페이지
  children: string;

  setOnModal: (state: boolean) => void;
};
/**
 * BaseModalFrame 컴포넌트 (공통 모달)
 *
 * - size Prop으로 "Login" / "Account" 타입을 선택할 수 있으며, 크기와 스타일이 달라집니다.
 * - children Prop으로 모달 내부에 표시할 내용을 전달할 수 있습니다.
 * - setOnModal Prop으로 부모에서 모달 열림/닫힘 상태를 제어합니다.
 *
 * 사용 예시:
 *   const [isModalOpen, setIsModalOpen] = useState(false);
 *
 *   {isModalOpen && (
 *     <BaseModalFrame size="Login" setOnModal={setIsModalOpen}>
 *       로그인 하시겠습니까?
 *     </BaseModalFrame>
 *   )}
 *
 *   <Button onClick={() => setIsModalOpen(true)}>모달 열기</Button>
 */
export default function BaseModalFrame({
  size = 'Login',
  children,
  setOnModal,
}: BaseModalFrameProps) {
  return (
    <ModalPortal>
      <div className='fixed inset-0 flex items-center justify-center bg-gray-900/70'>
        <div
          className={cn(
            'flex flex-col items-center justify-center bg-gray-0 text-center font-lg-medium text-gray-700 sm:w-[368px] sm:gap-8 sm:font-xl-medium',
            size === 'Login' && 'sm: h-[220px] w-[327px] gap-[50px] rounded-lg sm:rounded-2xl',
            size === 'Account' && 'h-[164px] w-[272px] rounded-2xl'
          )}>
          {children}
          <Button
            theme='primary'
            disabled={false}
            className={cn(
              'h-[42px] flex-none font-md-semibold sm:h-[48px] sm:w-[240px] sm:font-lg-semibold',
              size === 'Login' && 'w-[138px]',
              size === 'Account' && 'w-[192px]'
            )}
            onClick={() => setOnModal(false)}>
            확인
          </Button>
        </div>
      </div>
    </ModalPortal>
  );
}
