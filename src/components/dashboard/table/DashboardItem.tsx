import { ContentWrapper, ActionWrapper } from '@/components/dashboard/items/ItemWrappers';
import type { UserMe } from '@/types/userMe';
import { cn } from '@/utils/cn';

export type ItemType = 'MembersItem' | 'InvitesItem';

type MemberItemProps = {
  type: 'MembersItem';
  user: UserMe;
  userId: number;
  onDelete: (userId: number) => void;
};

type InviteItemProps = {
  type: 'InvitesItem';
  email: string;
  id: number;
  onCancel: (invitationId: number) => void;
};

export type DashboardItemRootProps = (MemberItemProps | InviteItemProps) & {
  className?: string;
  children: React.ReactNode;
};

function DashboardItem(props: DashboardItemRootProps) {
  return (
    <li
      className={cn(
        'flex items-center justify-between border-t border-gray-200 px-7 py-4 first:border-t-0',
        props.className
      )}>
      {props.children}
    </li>
  );
}

/**
 * 항목의 내용을 렌더링하는 컴포넌트입니다.
 * * @example <DashboardItem.Content />
 */
DashboardItem.Content = ContentWrapper;

/**
 * 항목의 액션 버튼을 렌더링하는 컴포넌트입니다.
 * * @example <DashboardItem.Action />
 */
DashboardItem.Action = ActionWrapper;

export default DashboardItem;
