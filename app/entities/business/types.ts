// BASE RESPONSES 
export interface GenericSuccessResponse { success?: boolean; message?: string; }
export interface HasPermissionResponse { success: boolean; error?: string; }

// ORGANIZATION 
export interface CreateOrganizationPayload {
  name: string;
  slug: string;
  userId?: string | null;
  logo?: string | null;
  metadata?: string | null;
  keepCurrentActiveOrganization?: boolean | null;
  categoryId?: number;
}

export interface UpdateOrganizationPayload {
  organizationId: string | null;
  data: {
    categoryId?: number | null;
    name?: string | null;
    slug?: string | null;
    logo?: string | null;
    metadata?: string | null;
  };
}

export interface OrganizationIdPayload {
  organizationId: string;
}

export interface SetActiveOrgPayload {
  organizationId?: string | null;
  organizationSlug?: string | null;
}

export interface CheckSlugPayload {
  slug: string;
}

//  MEMBER & INVITATION 
export interface InviteMemberPayload {
  email: string;
  role: string;
  organizationId?: string | null;
  resend?: boolean | null;
  teamId?: string;
}

export interface InvitationIdPayload {
  invitationId: string;
}

export interface RemoveMemberPayload {
  memberIdOrEmail: string;
  organizationId?: string | null;
}

export interface UpdateMemberRolePayload {
  role: string;
  memberId: string;
  organizationId?: string | null;
}

//  TEAM PAYLOADS 
export interface CreateTeamPayload {
  name: string;
  organizationId?: string | null;
  address?: string;
}

export interface UpdateTeamPayload {
  teamId: string;
  data: {
    id?: string;
    name?: string | null;
    organizationId?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    address?: string | null;
  };
}

export interface TeamIdPayload {
  teamId: string | null;
  organizationId?: string | null;
}

export interface TeamMemberPayload {
  teamId: string;
  userId: string;
}

// RETURN TYPES 
export interface InvitationResponse {
  id: string;
  email: string;
  role: string;
  organizationId: string;
  inviterId: string;
  status: string;
  expiresAt: string;
  createdAt?: string;
  organizationName?: string;
  organizationSlug?: string;
  inviterEmail?: string;
  teamId?: string;
}

export interface MemberResponse {
  id: string;
  userId: string;
  organizationId: string;
  role: string;
}

export interface TeamResponse {
  id: string;
  name: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  address?: string;
}

export interface TeamMemberResponse {
  id: string;
  userId: string;
  teamId: string;
  createdAt: string;
}