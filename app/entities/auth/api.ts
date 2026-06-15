import { apiFetch } from "@/app/lib/api-client"; 
import * as T from "./types"; 

const BASE = "auth";
const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.BASE_URL || "";

// Axios client  for Admin/Auth requests
const apiFetch = axios.create({
  baseURL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = {
  // GET: Fetch current session
  getSession: () => 
    apiFetch<T.SessionResponse>(`/${BASE}/get-session`),

  // POST: Sign Out (Requires empty body as per Swagger)
  signOut: () => 
    apiFetch<T.SignOutResponse>(`/${BASE}/sign-out`, { method: "POST", body: {} }),

  // POST: Sign Up
  signUpEmail: (body: T.SignUpEmailPayload) => 
    apiFetch<T.SignUpResponse>(`/${BASE}/sign-up/email`, { method: "POST", body }),

  // POST: Sign In
  signInEmail: (body: T.SignInEmailPayload) => 
    apiFetch<T.SignInResponse>(`/${BASE}/sign-in/email`, { method: "POST", body }),
};