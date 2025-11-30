import { InvitesItemAction, InvitesItemContent } from './InvitesItem';
import { MembersItemAction, MembersItemContent } from './MembersItem';

type InvitesItemProps = {
  type: 'InvitesItem';
  email: string;
  id: number;
  onCancel?: (invitationId: number) => void;
};

type MembersItemProps = {
  type: 'MembersItem';

  user: {
    nickname: string;
    profileImageUrl: string | null;
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  userId: number;
  onDelete?: (userId: number) => void;
};

type WrapperProps = InvitesItemProps | MembersItemProps;

export const ContentWrapper = (props: WrapperProps) => {
  if (props.type === 'MembersItem') {
    return <MembersItemContent user={props.user} />;
  }
  if (props.type === 'InvitesItem') {
    return <InvitesItemContent email={props.email} />;
  }
  return null;
};

export function ActionWrapper(props: WrapperProps) {
  if (props.type === 'MembersItem') {
    return <MembersItemAction userId={props.userId} onDelete={props.onDelete} />;
  }
  if (props.type === 'InvitesItem') {
    return <InvitesItemAction userId={props.id} onCancel={props.onCancel} />;
  }
  return null;
}
