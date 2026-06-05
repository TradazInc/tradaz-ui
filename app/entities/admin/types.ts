// --- COMMON RESPONSES ---
export interface GenericUserResponse { user: string; }
export interface GenericSuccessResponse { success: boolean; }
export interface GenericMessageResponse { message: string; }

// --- QUERY PARAMS (GET) ---
export type GetUserParams = { 
  id: string; 
};

export type ListUsersParams = {
  searchValue?: string;
  searchField?: string;
  searchOperator?: string;
  limit?: string | number;
  offset?: string | number;
  sortBy?: string;
  sortDirection?: string;
  filterField?: string;
  filterValue?: string;
  filterOperator?: string;
};

// --- PAYLOADS (POST) ---
export interface SetRolePayload { userId: string; role: string; }
export interface CreateUserPayload { email: string; password?: string; name: string; role?: string; data?: string; }
export interface UpdateUserPayload { userId: string; data: string; }
export interface BanUserPayload { userId: string; banReason?: string; banExpiresIn?: number; }
export interface UserIdPayload { userId: string; } // Used for unban, impersonate, remove, list-sessions
export interface RevokeSessionPayload { sessionToken: string; }
export interface SetPasswordPayload { userId: string; newPassword: string; }
export interface HasPermissionPayload { permissions: Record<string, unknown>; }

// --- SPECIFIC RESPONSES ---
export interface ListUsersResponse {
  users: string[];
  total: number;
  limit: number;
  offset: number;
}

export interface ListSessionsResponse { sessions: string[]; }
export interface ImpersonateResponse { session: string; user: string; }
export interface SetPasswordResponse { status: boolean; }
export interface HasPermissionResponse { error?: string; success: boolean; }