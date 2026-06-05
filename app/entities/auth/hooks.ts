// app/entities/auth/hooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "./api";


// --- GET: Fetch Session State ---
export function useAuthSession() {
  return useQuery({
    queryKey: ["auth", "session"],
    queryFn: authApi.getSession,
    // Optional: Don't automatically retry if the user isn't logged in (returns 401)
    retry: false, 
  });
}

// --- POST: Mutate Auth State ---
export function useAuthActions() {
  const queryClient = useQueryClient();

  // Helper to globally refresh session data across the app after auth events
  const refreshSession = () => {
    queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
  };

  // Helper to completely clear the cache when logging out
  const clearSession = () => {
    queryClient.clear();
  };

  return {
    signUp: useMutation({ 
      mutationFn: authApi.signUpEmail, 
      onSuccess: refreshSession 
    }),
    
    signIn: useMutation({ 
      mutationFn: authApi.signInEmail, 
      onSuccess: refreshSession 
    }),
    
    signOut: useMutation({ 
      mutationFn: authApi.signOut, 
      onSuccess: clearSession // Wipes cached data globally for security
    }),
  };
}