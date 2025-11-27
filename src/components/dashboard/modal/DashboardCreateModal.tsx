import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '@/components/common/Button';
import Input from '@/components/common/input/Input';
import FormModal from '@/components/common/modal/FormModal';
import ColorPicker from '@/components/dashboard/ColorPicker';
import { DEFAULT_COLOR, type ColorHex } from '@/constants/color';
import { NEW_DASHBOARD } from '@/constants/modalName';
import { useModal } from '@/hooks/useModal';
import { createDashboard } from '@/lib/apis/dashboards';

export default function DashboardCreateModal() {
  const { handleModalClose } = useModal(NEW_DASHBOARD);
  const [selectedColor, setSelectedColor] = useState<ColorHex>(DEFAULT_COLOR);
  const [dashboardName, setDashboardName] = useState('');
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const navigate = useNavigate();
  const disabled = dashboardName.trim() === '';

  const handleSubmit = async () => {
    // TODO: useMutation 구현 시 변경
    const reqBody = { title: dashboardName, color: selectedColor };
    try {
      const data = await createDashboard(reqBody);
      handleModalClose();
      navigate(`/dashboard/${data.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiErrorMsg(error.response?.data?.message ?? '오류가 발생했습니다.');
      }
    }
  };

  return (
    <FormModal modalName={NEW_DASHBOARD}>
      <FormModal.Title title='새로운 대시보드' />
      <FormModal.Form onSubmit={handleSubmit}>
        <FormModal.Body>
          <div className='flex flex-col gap-[16px]'>
            <Input value={dashboardName} onChange={setDashboardName}>
              <Input.Label className='font-lg-medium sm:font-2lg-medium'>대시보드 이름</Input.Label>
              <Input.Group>
                <Input.Field
                  name='dashboardName'
                  type='text'
                  placeholder='대시보드 이름을 입력해 주세요'
                />
              </Input.Group>
              <Input.ErrorMessage>{apiErrorMsg}</Input.ErrorMessage>
            </Input>
            <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
          </div>
        </FormModal.Body>
        <FormModal.Footer className='pt-[32px] sm:pt-[40px]'>
          <Button theme={'outlined'} onClick={handleModalClose}>
            취소
          </Button>
          <Button theme={'primary'} type='submit' disabled={disabled}>
            생성
          </Button>
        </FormModal.Footer>
      </FormModal.Form>
    </FormModal>
  );
}
