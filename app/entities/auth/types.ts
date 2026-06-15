// auth/types.ts
// ... existing imports/exports ...

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  // username plugin fields
  username?: string;
  displayUsername?: string;
}

export interface SignUpEmailPayload {
  name: string;
  email: string;
  password: string;
  image?: string;
  callbackURL?: string;
  rememberMe?: boolean;
  // username plugin
  username?: string;
  displayUsername?: string;
}

export interface SignInEmailPayload {
  email: string;
  password: string;
  callbackURL?: string;
  rememberMe?: boolean;
}

// New for username sign-in
export interface SignInUsernamePayload {
  username: string;
  password: string;
  callbackURL?: string;
  rememberMe?: boolean;
}

// New for update user
export interface UpdateUserPayload {
  username?: string;
}

// ... keep SessionResponse, SignUpResponse, etc. as-is ...