import { create } from "zustand";

import type { AuthSession, AuthUser } from "@/lib/auth/contracts";

export type SessionStatus = "unknown" | "authenticated" | "unauthenticated";

type AuthState = {
  sessionStatus: SessionStatus;
  accessToken: string | null;
  user: AuthUser | null;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
  markUnknown: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  sessionStatus: "unknown",
  accessToken: null,
  user: null,
  setSession: (session) =>
    set({
      sessionStatus: "authenticated",
      accessToken: session.accessToken,
      user: session.user,
    }),
  clearSession: () =>
    set({
      sessionStatus: "unauthenticated",
      accessToken: null,
      user: null,
    }),
  markUnknown: () =>
    set({
      sessionStatus: "unknown",
      accessToken: null,
      user: null,
    }),
}));

export const selectAuthUser = (state: AuthState) => state.user;
export const selectSessionStatus = (state: AuthState) => state.sessionStatus;
