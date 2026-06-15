import axios, { AxiosResponse } from "axios";
import * as T from "./types";

const BASE = "api/auth/organization";
const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.BASE_URL || "";

// Custom Axios instance just for this entity to handle session cookies
const businessAxios = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Helper for strict TypeScript inference
const extractData = <R>(res: AxiosResponse<R>) => res.data;

export const businessApi = {
 
  // ORGANIZATION CORE
 
  create: (body: T.CreateOrganizationPayload) => 
    businessAxios.post<Record<string, unknown>>(`/${BASE}/create`, body).then(extractData),

  update: (body: T.UpdateOrganizationPayload) => 
    businessAxios.post<Record<string, unknown>>(`/${BASE}/update`, body).then(extractData),

  delete: (body: T.OrganizationIdPayload) => 
    businessAxios.post<string>(`/${BASE}/delete`, body).then(extractData),

  setActive: (body: T.SetActiveOrgPayload) => 
    businessAxios.post<Record<string, unknown>>(`/${BASE}/set-active`, body).then(extractData),

  getFull: () => 
    businessAxios.get<Record<string, unknown>>(`/${BASE}/get-full-organization`).then(extractData),

  list: () => 
    businessAxios.get<string[]>(`/${BASE}/list`).then(extractData),

  checkSlug: (body: T.CheckSlugPayload) => 
    businessAxios.post<Record<string, unknown>>(`/${BASE}/check-slug`, body).then(extractData),

  hasPermission: (body: T.HasPermissionPayload) => 
    businessAxios.post<T.HasPermissionResponse>(`/${BASE}/has-permission`, body).then(extractData),

  leave: (body: T.OrganizationIdPayload) => 
    businessAxios.post<Record<string, unknown>>(`/${BASE}/leave`, body).then(extractData),

  
  // MEMBERS & INVITATIONS
 
  inviteMember: (body: T.InviteMemberPayload) => 
    businessAxios.post<T.InvitationResponse>(`/${BASE}/invite-member`, body).then(extractData),

  cancelInvitation: (body: T.InvitationIdPayload) => 
    businessAxios.post<Record<string, unknown>>(`/${BASE}/cancel-invitation`, body).then(extractData),

  acceptInvitation: (body: T.InvitationIdPayload) => 
    businessAxios.post<{ invitation: unknown, member: unknown }>(`/${BASE}/accept-invitation`, body).then(extractData),

  rejectInvitation: (body: T.InvitationIdPayload) => 
    businessAxios.post<{ invitation: unknown, member: unknown }>(`/${BASE}/reject-invitation`, body).then(extractData),

  getInvitation: (id: string) => 
    businessAxios.get<T.InvitationResponse>(`/${BASE}/get-invitation`, { params: { id } }).then(extractData),

  listInvitations: () => 
    businessAxios.get<T.InvitationResponse[]>(`/${BASE}/list-invitations`).then(extractData),

  listUserInvitations: () => 
    businessAxios.get<T.InvitationResponse[]>(`/${BASE}/list-user-invitations`).then(extractData),

  listMembers: () => 
    businessAxios.get<T.MemberResponse[]>(`/${BASE}/list-members`).then(extractData),

  getActiveMember: () => 
    businessAxios.get<T.MemberResponse>(`/${BASE}/get-active-member`).then(extractData),

  getActiveMemberRole: () => 
    businessAxios.get<Record<string, unknown>>(`/${BASE}/get-active-member-role`).then(extractData),

  removeMember: (body: T.RemoveMemberPayload) => 
    businessAxios.post<{ member: T.MemberResponse }>(`/${BASE}/remove-member`, body).then(extractData),

  updateMemberRole: (body: T.UpdateMemberRolePayload) => 
    businessAxios.post<{ member: T.MemberResponse }>(`/${BASE}/update-member-role`, body).then(extractData),

  
  // TEAMS
 
  createTeam: (body: T.CreateTeamPayload) => 
    businessAxios.post<T.TeamResponse>(`/${BASE}/create-team`, body).then(extractData),

  listTeams: () => 
    businessAxios.get<T.TeamResponse[]>(`/${BASE}/list-teams`).then(extractData),

  updateTeam: (body: T.UpdateTeamPayload) => 
    businessAxios.post<T.TeamResponse>(`/${BASE}/update-team`, body).then(extractData),

  removeTeam: (body: T.TeamIdPayload) => 
    businessAxios.post<{ message: string }>(`/${BASE}/remove-team`, body).then(extractData),

  setActiveTeam: (body: Pick<T.TeamIdPayload, 'teamId'>) => 
    businessAxios.post<Record<string, unknown>>(`/${BASE}/set-active-team`, body).then(extractData),

  listUserTeams: () => 
    businessAxios.get<unknown[]>(`/${BASE}/list-user-teams`).then(extractData),

  listTeamMembers: () => 
    businessAxios.get<T.TeamMemberResponse[]>(`/${BASE}/list-team-members`).then(extractData),

  addTeamMember: (body: T.TeamMemberPayload) => 
    businessAxios.post<T.TeamMemberResponse>(`/${BASE}/add-team-member`, body).then(extractData),

  removeTeamMember: (body: T.TeamMemberPayload) => 
    businessAxios.post<{ message: string }>(`/${BASE}/remove-team-member`, body).then(extractData),
};