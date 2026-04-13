import type {
  AuthSession,
  LoginRequest,
  RegisterRequest,
} from "@/lib/auth/contracts";
import { parseAuthSession } from "@/lib/auth/contracts";
import { useAuthStore } from "@/stores/auth-store";

import { apiRequest } from "./http-client";

export async function login(payload: LoginRequest): Promise<AuthSession> {
  const response = await apiRequest<unknown>({
    path: "/auth/login",
    method: "POST",
    body: payload,
    skipAuth: true,
    skipAuthRefresh: true,
  });

  const session = parseAuthSession(response);
  useAuthStore.getState().setSession(session);

  return session;
}

export async function register(payload: RegisterRequest): Promise<AuthSession> {
  const response = await apiRequest<unknown>({
    path: "/auth/register",
    method: "POST",
    body: payload,
    skipAuth: true,
    skipAuthRefresh: true,
  });

  const session = parseAuthSession(response);
  useAuthStore.getState().setSession(session);

  return session;
}

export async function refreshSession(): Promise<AuthSession | null> {
  try {
    const response = await apiRequest<unknown>({
      path: "/auth/refresh",
      method: "POST",
      skipAuth: true,
      skipAuthRefresh: true,
    });

    const session = parseAuthSession(response);
    useAuthStore.getState().setSession(session);

    return session;
  } catch (_error) {
    useAuthStore.getState().clearSession();
    return null;
  }
}

export async function logout(): Promise<void> {
  try {
    await apiRequest({
      path: "/auth/logout",
      method: "POST",
      skipAuthRefresh: true,
    });
  } finally {
    useAuthStore.getState().clearSession();
  }
}
