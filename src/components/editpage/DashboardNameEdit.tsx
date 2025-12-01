import { useState, useMemo, useContext } from 'react';
import { useParams } from 'react-router';
import Button from '@/components/common/Button';
import Input from '@/components/common/input/Input';
import BaseModalFrame from '@/components/common/modal/BaseModalFrame';
import FormModal from '@/components/common/modal/FormModal';
import Title from '@/components/common/Title';
import ColorPicker from '@/components/dashboard/ColorPicker';
import DashboardCreateModal from '@/components/dashboard/modal/DashboardCreateModal';
import DashboardContainer from '@/components/dashboard/table/DashboardContainer';
import DashboardHeader from '@/components/dashboard/table/DashboardHeader';
import { DEFAULT_COLOR, type ColorHex } from '@/constants/color';
import { DashboardContext } from '@/context/dashboardContext';
import useBaseModal from '@/hooks/useBaseModal';
import useMutation from '@/hooks/useMutation';
import { changeDashboard, type ChangeDashboardParams } from '@/lib/apis/dashboards';
import type { Dashboard } from '@/types/dashboardsData';

export default function DashboardNameEdit() {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const { dashboardsData, isLoading: contextIsLoading } = useContext(DashboardContext);

  const {
    isOpen: baseModalIsOpen,
    handleModalOpen: openBaseModal,
    handleModalClose: closeBaseModal,
  } = useBaseModal();

  const numericDashboardId = useMemo(
    () => (dashboardId ? Number(dashboardId) : null),
    [dashboardId]
  );

  const currentDashboard = useMemo(() => {
    if (numericDashboardId && dashboardsData?.dashboards) {
      return dashboardsData.dashboards.find((d: Dashboard) => d.id === numericDashboardId);
    }
    return null;
  }, [numericDashboardId, dashboardsData]);

  const [editingName, setEditingName] = useState(() => currentDashboard?.title ?? '');
  const [selectedColor, setSelectedColor] = useState<ColorHex>(
    () => (currentDashboard?.color as ColorHex) || DEFAULT_COLOR
  );

  const finalTitle = useMemo(
    () => currentDashboard?.title ?? '대시보드 로딩 중...',
    [currentDashboard]
  );

  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isColorChanged, setIsColorChanged] = useState(false);

  const isNameModified = useMemo(
    () => editingName !== currentDashboard?.title,
    [editingName, currentDashboard]
  );
  const isColorModified = useMemo(
    () => selectedColor !== ((currentDashboard?.color as ColorHex) || DEFAULT_COLOR),
    [selectedColor, currentDashboard]
  );

  const disabled = useMemo(() => {
    if (!isNameModified && !isColorModified) {
      return true;
    }

    if (isNameModified && !isColorModified && editingName.trim() === '') {
      return true;
    }

    return false;
  }, [isNameModified, isColorModified, editingName]);

  const updateDashboardMutation = useMutation<Dashboard, ChangeDashboardParams>({
    mutationFn: (data) => {
      if (!numericDashboardId) {
        throw new Error('Dashboard ID가 없습니다.');
      }
      return changeDashboard(numericDashboardId, data);
    },
    onSuccess: (updated) => {
      if (!updated) {
        return;
      }

      const nameModified = updated.title !== finalTitle;
      const colorModified =
        updated.color !== ((currentDashboard?.color as ColorHex) || DEFAULT_COLOR);

      setIsNameChanged(nameModified);
      setIsColorChanged(colorModified);

      setEditingName(updated.title);
      setSelectedColor(updated.color as ColorHex);

      if (nameModified || colorModified) {
        openBaseModal();
      }
    },
  });

  const handleSubmit = async () => {
    if (!numericDashboardId) {
      alert('유효하지 않은 대시보드 ID입니다.');
      return;
    }

    updateDashboardMutation.mutate({
      title: editingName,
      color: selectedColor,
    });
  };

  if (!dashboardId || numericDashboardId === null) {
    return <div>유효하지 않은 대시보드 ID입니다.</div>;
  }

  if (contextIsLoading || !currentDashboard) {
    return (
      <div>
        {contextIsLoading ? '대시보드 정보를 로딩 중입니다.' : '대시보드 정보를 찾을 수 없습니다.'}
      </div>
    );
  }

  return (
    <DashboardContainer type='EditDashboardName' key={numericDashboardId}>
      <DashboardCreateModal />

      <DashboardHeader>
        <Title as='h2' size='xl' weight='bold' className='pb-[24px]'>
          {finalTitle}
        </Title>
      </DashboardHeader>

      <FormModal.Form onSubmit={handleSubmit}>
        <FormModal.Body>
          <div className='flex flex-col gap-[16px]'>
            <Input value={editingName} onChange={setEditingName}>
              <Input.Label className='label-style'>대시보드 이름</Input.Label>
              <Input.Group>
                <Input.Field
                  name='dashboardName'
                  type='text'
                  placeholder='대시보드 이름을 입력해 주세요'
                />
              </Input.Group>
            </Input>

            <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
          </div>
        </FormModal.Body>

        <Button
          theme='primary'
          type='submit'
          size='lg'
          className='mt-[32px] w-full py-[12px] sm:mt-[40px] sm:px-[46px] lg:w-[564px]'
          disabled={disabled || updateDashboardMutation.isLoading}>
          {updateDashboardMutation.isLoading ? '변경 중...' : '변경'}
        </Button>
      </FormModal.Form>

      {baseModalIsOpen && (
        <BaseModalFrame setOnModal={closeBaseModal}>
          <div className='text-center'>
            <p className='mb-2 text-lg font-bold'>변경 완료! 🎉</p>

            {isNameChanged && isColorChanged ? (
              <p>대시보드가 변경되었습니다.</p>
            ) : isNameChanged ? (
              <p>대시보드 이름이 변경되었습니다.</p>
            ) : isColorChanged ? (
              <p>대시보드 컬러가 변경되었습니다.</p>
            ) : null}
          </div>
        </BaseModalFrame>
      )}
    </DashboardContainer>
  );
}
