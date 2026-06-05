// --- COMMON MODELS ---
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// --- PAYLOADS (Requests) ---
export interface SignUpEmailPayload {
  name: string;
  email: string;
  password: string;
  image?: string;
  callbackURL?: string;
  rememberMe?: boolean;
}

export interface SignInEmailPayload {
  email: string;
  password: string;
  callbackURL?: string;
  rememberMe?: boolean;
}

// --- RESPONSES ---
export interface SessionResponse {
  session: string;
  user: string | AuthUser; 
}

export interface SignOutResponse {
  success: boolean;
}

export interface SignUpResponse {
  token: string;
  user: AuthUser;
}

export interface SignInResponse {
  redirect: boolean;
  token: string;
  url?: string;
  user: Record<string, unknown> | AuthUser;
}