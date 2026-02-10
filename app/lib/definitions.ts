// Sign In Type Definitions
export interface SignInData {
  login: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: User;
}

export interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string | null;
  is_verified: boolean;
  email_verified: boolean;
  phone_verified: boolean;
}

// Register Type Definitions
export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  subscribed_sms_campaigns: boolean;
  subscribed_email_campaigns: boolean;
}

export interface RegisterResponse {}
