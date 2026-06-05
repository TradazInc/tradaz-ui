import { apiFetch } from "@/app/lib/api-client"; 
import * as T from "./types"; 

const BASE = "auth/admin";

export const adminApi = {
  // GET Requests (Params)
  getUser: (params: T.GetUserParams) => 
    apiFetch<T.GenericUserResponse>(`/${BASE}/get-user`, { params }),
  
  listUsers: (params?: T.ListUsersParams) => 
    apiFetch<T.ListUsersResponse>(`/${BASE}/list-users`, { params }),

  // POST Requests (Payloads)
  createUser: (body: T.CreateUserPayload) => 
    apiFetch<T.GenericUserResponse>(`/${BASE}/create-user`, { method: "POST", body }),
    
  updateUser: (body: T.UpdateUserPayload) => 
    apiFetch<T.GenericUserResponse>(`/${BASE}/update-user`, { method: "POST", body }),
    
  setRole: (body: T.SetRolePayload) => 
    apiFetch<T.GenericUserResponse>(`/${BASE}/set-role`, { method: "POST", body }),

  banUser: (body: T.BanUserPayload) => 
    apiFetch<T.GenericUserResponse>(`/${BASE}/ban-user`, { method: "POST", body }),
    
  unbanUser: (body: T.UserIdPayload) => 
    apiFetch<T.GenericUserResponse>(`/${BASE}/unban-user`, { method: "POST", body }),
    
  removeUser: (body: T.UserIdPayload) => 
    apiFetch<T.GenericSuccessResponse>(`/${BASE}/remove-user`, { method: "POST", body }),

  setPassword: (body: T.SetPasswordPayload) => 
    apiFetch<T.SetPasswordResponse>(`/${BASE}/set-user-password`, { method: "POST", body }),

  // Session Management
  listUserSessions: (body: T.UserIdPayload) => 
    apiFetch<T.ListSessionsResponse>(`/${BASE}/list-user-sessions`, { method: "POST", body }),
    
  revokeSession: (body: T.RevokeSessionPayload) => 
    apiFetch<T.GenericSuccessResponse>(`/${BASE}/revoke-user-session`, { method: "POST", body }),
    
  revokeAllSessions: (body: T.UserIdPayload) => 
    apiFetch<T.GenericSuccessResponse>(`/${BASE}/revoke-user-sessions`, { method: "POST", body }),

  // Impersonation & Permissions
  impersonateUser: (body: T.UserIdPayload) => 
    apiFetch<T.ImpersonateResponse>(`/${BASE}/impersonate-user`, { method: "POST", body }),
    
  stopImpersonating: () => 
    apiFetch<void>(`/${BASE}/stop-impersonating`, { method: "POST" }),
    
  hasPermission: (body: T.HasPermissionPayload) => 
    apiFetch<T.HasPermissionResponse>(`/${BASE}/has-permission`, { method: "POST", body }),
};