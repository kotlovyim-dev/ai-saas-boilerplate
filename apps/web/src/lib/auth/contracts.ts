import type { components } from "@ai-saas/types/api";
import { z } from "zod";

export type LoginRequest = components["schemas"]["LoginDto"];
export type RegisterRequest = components["schemas"]["RegisterDto"];

const authUserSchema = z.object({
  id: z.string().min(1),
  email: z.string().min(1),
  role: z.string().min(1),
  tenantId: z.string().min(1),
});

const authSessionSchema = z.object({
  accessToken: z.string().min(1),
  user: authUserSchema,
});

export type AuthUser = z.infer<typeof authUserSchema>;
export type AuthSession = z.infer<typeof authSessionSchema>;

export function parseAuthSession(input: unknown): AuthSession {
  return authSessionSchema.parse(input);
}
