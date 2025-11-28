import Button from '@/components/common/Button';
import { INVITE } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';

export default function DashboardDetail() {
  const { handleModalOpen } = useModal(INVITE);
  return (
    <div>
      대시보드 상세페이지
      {/* 테스트용 버튼입니다. 나중에 지우시면됩니다! */}
      <Button onClick={handleModalOpen}>대시보드 초대 (상세버튼)</Button>
    </div>
  );
}
