import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { login, logout, refreshSession, register } from "@/lib/api/auth-api";
import type { LoginRequest, RegisterRequest } from "@/lib/auth/contracts";
import { queryKeys } from "@/lib/query-keys";
import { useAuthStore } from "@/stores/auth-store";

export function useBootstrapSessionQuery() {
  const shouldBootstrap = useAuthStore(
    (state) => state.sessionStatus === "unknown",
  );

  return useQuery({
    queryKey: queryKeys.auth.session,
    queryFn: refreshSession,
    enabled: shouldBootstrap,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
    onSuccess: (session) => {
      queryClient.setQueryData(queryKeys.auth.session, session);
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterRequest) => register(payload),
    onSuccess: (session) => {
      queryClient.setQueryData(queryKeys.auth.session, session);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.session, null);
    },
  });
}
