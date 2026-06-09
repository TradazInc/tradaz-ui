import axios, { AxiosResponse } from "axios";
import * as T from "./types"; 

const BASE = "auth/admin";
const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.BASE_URL || "";

// Axios client  for Admin/Auth requests
const adminAxios = axios.create({
  baseURL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});


const extractData = <R>(res: AxiosResponse<R>) => res.data;

export const adminApi = {
  // GET Requests (Params)
  getUser: (params: T.GetUserParams) => 
    adminAxios.get<T.GenericUserResponse>(`/${BASE}/get-user`, { params }).then(extractData),
  
  listUsers: (params?: T.ListUsersParams) => 
    adminAxios.get<T.ListUsersResponse>(`/${BASE}/list-users`, { params }).then(extractData),

  // POST Requests (Payloads)
  createUser: (body: T.CreateUserPayload) => 
    adminAxios.post<T.GenericUserResponse>(`/${BASE}/create-user`, body).then(extractData),
    
  updateUser: (body: T.UpdateUserPayload) => 
    adminAxios.post<T.GenericUserResponse>(`/${BASE}/update-user`, body).then(extractData),
    
  setRole: (body: T.SetRolePayload) => 
    adminAxios.post<T.GenericUserResponse>(`/${BASE}/set-role`, body).then(extractData),

  banUser: (body: T.BanUserPayload) => 
    adminAxios.post<T.GenericUserResponse>(`/${BASE}/ban-user`, body).then(extractData),
    
  unbanUser: (body: T.UserIdPayload) => 
    adminAxios.post<T.GenericUserResponse>(`/${BASE}/unban-user`, body).then(extractData),
    
  removeUser: (body: T.UserIdPayload) => 
    adminAxios.post<T.GenericSuccessResponse>(`/${BASE}/remove-user`, body).then(extractData),

  setPassword: (body: T.SetPasswordPayload) => 
    adminAxios.post<T.SetPasswordResponse>(`/${BASE}/set-user-password`, body).then(extractData),

  // Session Management
  listUserSessions: (body: T.UserIdPayload) => 
    adminAxios.post<T.ListSessionsResponse>(`/${BASE}/list-user-sessions`, body).then(extractData),
    
  revokeSession: (body: T.RevokeSessionPayload) => 
    adminAxios.post<T.GenericSuccessResponse>(`/${BASE}/revoke-user-session`, body).then(extractData),
    
  revokeAllSessions: (body: T.UserIdPayload) => 
    adminAxios.post<T.GenericSuccessResponse>(`/${BASE}/revoke-user-sessions`, body).then(extractData),

  // Impersonation & Permissions
  impersonateUser: (body: T.UserIdPayload) => 
    adminAxios.post<T.ImpersonateResponse>(`/${BASE}/impersonate-user`, body).then(extractData),
    
  stopImpersonating: () => 
    adminAxios.post<void>(`/${BASE}/stop-impersonating`).then(extractData),
    
  hasPermission: (body: T.HasPermissionPayload) => 
    adminAxios.post<T.HasPermissionResponse>(`/${BASE}/has-permission`, body).then(extractData),
};