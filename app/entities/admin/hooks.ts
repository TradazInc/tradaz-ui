// entities/admin/hooks.ts
import { useState, useCallback } from "react";
import { adminApi } from "./api";
import * as T from "./types";

//  Dashboard/Listing Pages
export function useAdminUserList() {
  const [data, setData] = useState<T.ListUsersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(async (params?: T.ListUsersParams) => {
    setIsLoading(true);
    try {
      const response = await adminApi.listUsers(params);
      setData(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, fetchUsers };
}



export function useAdminUserActions() {
  const [isMutating, setIsMutating] = useState(false);

  const executeMutation = async <P, R>(
    mutationFn: (payload: P) => Promise<R>, 
    payload: P
  ): Promise<R> => {
    setIsMutating(true);
    try {
      return await mutationFn(payload);
    } finally {
      setIsMutating(false);
    }
  };

  return {
    isMutating,
    
    createUser: (p: T.CreateUserPayload) => executeMutation(adminApi.createUser, p),
    setPassword: (p: T.SetPasswordPayload) => executeMutation(adminApi.setPassword, p),
    impersonateUser: (p: T.UserIdPayload) => executeMutation(adminApi.impersonateUser, p),
   
    banUser: (p: T.BanUserPayload) => executeMutation(adminApi.banUser, p),
    unbanUser: (p: T.UserIdPayload) => executeMutation(adminApi.unbanUser, p),
    setRole: (p: T.SetRolePayload) => executeMutation(adminApi.setRole, p),
    removeUser: (p: T.UserIdPayload) => executeMutation(adminApi.removeUser, p),
    revokeAllSessions: (p: T.UserIdPayload) => executeMutation(adminApi.revokeAllSessions, p),
  };
}