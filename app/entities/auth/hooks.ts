import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/app/lib/auth-client"; 

// ---- Session ----
export function useAuthSession() {
  return useQuery({
    queryKey: ["auth", "session"],
    queryFn: () => authClient.getSession(),
    retry: false,
  });
}

// ---- Mutations ----
export function useAuthActions() {
  const queryClient = useQueryClient();

  const refreshSession = () =>
    queryClient.invalidateQueries({ queryKey: ["auth", "session"] });

  const clearSession = () => queryClient.clear();

  // Email sign-up (already supports username & displayUsername fields)
  const signUp = useMutation({
    mutationFn: (data: {
      email: string;
      password: string;
      name: string;
      username?: string;
      displayUsername?: string;
    }) => authClient.signUp.email(data),
    onSuccess: refreshSession,
  });

  // Email sign-in (keep if you still need it)
  const signInEmail = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authClient.signIn.email(data),
    onSuccess: refreshSession,
  });

  // Username sign-in (new)
  const signInUsername = useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      authClient.signIn.username(data),
    onSuccess: refreshSession,
  });

  // Sign out
  const signOut = useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: clearSession,
  });

  // Update user (can update username)
  const updateUser = useMutation({
    mutationFn: (data: { username?: string }) =>
      authClient.updateUser(data),
    onSuccess: refreshSession,
  });

  return {
    signUp,
    signInEmail,      // still available
    signInUsername,   // new
    signOut,
    updateUser,       // new
  };
}

// ---- Username availability check (query) ----
export function useIsUsernameAvailable(username: string) {
  return useQuery({
    queryKey: ["auth", "username-available", username],
    queryFn: () => authClient.isUsernameAvailable({ username }),
    enabled: username.length > 0, // only run when username is not empty
  });
}