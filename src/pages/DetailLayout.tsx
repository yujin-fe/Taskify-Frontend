import axios from 'axios';
import { useState } from 'react';
import { Outlet, useParams } from 'react-router';
import BaseModalFrame from '@/components/common/modal/BaseModalFrame';
import DashboardInviteModal from '@/components/dashboard/modal/DashboardInviteModal';
import { INVITE } from '@/constants/modalName';
import useBaseModal from '@/hooks/useBaseModal';
import { useModal } from '@/hooks/useModal';
import { inviteDashboard } from '@/lib/apis/Invitations';

export default function DetailLayout() {
  const { dashboardId } = useParams();
  const {
    isOpen: baseModalIsOpen,
    handleModalOpen: openBaseModal,
    handleModalClose: closeBaseModal,
  } = useBaseModal();
  const { isOpen: inviteModalIsOpen, handleModalClose: closeInviteModal } = useModal(INVITE);
  const [inviteeEmail, setInviteeEmail] = useState('');
  const [inputErrorMsg, setInputErrorMsg] = useState('');

  // TODO: useMutations 훅 구현 시 대체
  const [completedInviteeUser, setCompletedInviteeUser] = useState('');
  const [apiErrorMsg, setApiErrorMsg] = useState('');

  if (!dashboardId) {
    return null;
  }

  const handleInviteSubmit = async () => {
    try {
      // TODO: useMutations 훅 구현 시 대체
      const resData = await inviteDashboard(dashboardId, { email: inviteeEmail });
      setCompletedInviteeUser(resData.invitee.nickname);
      openBaseModal();
      closeInviteModal();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setApiErrorMsg(err.response?.data?.message ?? '오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
      <Outlet />
      {inviteModalIsOpen && (
        <DashboardInviteModal
          inviteeEmail={inviteeEmail}
          setInviteeEmail={setInviteeEmail}
          errorMsg={inputErrorMsg}
          setErrorMsg={setInputErrorMsg}
          onSubmit={handleInviteSubmit}
          apiErrorMsg={apiErrorMsg}
        />
      )}
      {baseModalIsOpen && (
        <BaseModalFrame setOnModal={() => closeBaseModal()}>
          {completedInviteeUser}님 <br /> 초대가 완료되었습니다!
        </BaseModalFrame>
      )}
    </>
  );
}
