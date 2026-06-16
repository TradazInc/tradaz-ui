export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  joinedAt: string;
}

export interface RawAuthUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  banned?: boolean;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface BetterAuthResponse {
  data?: {
    users?: RawAuthUser[];
  };
  users?: RawAuthUser[];
}