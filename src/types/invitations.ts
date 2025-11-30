export interface InvitationParams {
  size?: number;
  cursorId?: number;
  title?: string | null;
}

interface User {
  id: number;
  nickname: string;
  email: string;
}

interface Dashboard {
  id: number;
  title: string;
}

interface Invitation {
  id: number;
  inviter: User;
  invitee: User;
  teamId: string;
  dashboard: Dashboard;
  inviteAccepted: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface InvitationResponse {
  cursorId: number;
  invitations: Invitation[];
}
