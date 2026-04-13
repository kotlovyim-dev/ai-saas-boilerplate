import { parseAuthSession } from "@/lib/auth/contracts";
import { useAuthStore } from "@/stores/auth-store";

import { toApiError } from "./api-error";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiRequestConfig = {
  path: string;
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  signal?: AbortSignal;
  skipAuth?: boolean;
  skipAuthRefresh?: boolean;
};

const FALLBACK_API_URL = "http://localhost:3001";
const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? FALLBACK_API_URL
).replace(/\/$/, "");

let refreshPromise: Promise<string | null> | null = null;

function getUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildHeaders(
  configHeaders: HeadersInit | undefined,
  body: unknown,
): Headers {
  const headers = new Headers(configHeaders);

  if (body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return headers;
}

async function readResponsePayload(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    const text = await response.text();
    return text.length > 0 ? text : undefined;
  }

  return response.json();
}

async function executeRequest(
  config: ApiRequestConfig,
  accessTokenOverride?: string | null,
): Promise<Response> {
  const headers = buildHeaders(config.headers, config.body);

  if (!config.skipAuth) {
    const accessToken =
      accessTokenOverride ?? useAuthStore.getState().accessToken;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
  }

  return fetch(getUrl(config.path), {
    method: config.method ?? "GET",
    headers,
    credentials: "include",
    body: config.body === undefined ? undefined : JSON.stringify(config.body),
    signal: config.signal,
  });
}

async function parseResponse<T>(response: Response, path: string): Promise<T> {
  const payload = await readResponsePayload(response);

  if (!response.ok) {
    throw toApiError(response.status, payload, `Request to ${path} failed`);
  }

  return payload as T;
}

async function runRefreshFlow(): Promise<string | null> {
  try {
    const response = await fetch(getUrl("/auth/refresh"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const payload = await readResponsePayload(response);

    if (!response.ok) {
      useAuthStore.getState().clearSession();
      return null;
    }

    const session = parseAuthSession(payload);
    useAuthStore.getState().setSession(session);
    return session.accessToken;
  } catch {
    useAuthStore.getState().clearSession();
    return null;
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = runRefreshFlow().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function apiRequest<T>(config: ApiRequestConfig): Promise<T> {
  const response = await executeRequest(config);

  const canRetryWithRefresh =
    response.status === 401 &&
    !config.skipAuthRefresh &&
    config.path !== "/auth/refresh";

  if (canRetryWithRefresh) {
    const refreshedToken = await refreshAccessToken();

    if (refreshedToken) {
      const retryResponse = await executeRequest(config, refreshedToken);
      return parseResponse<T>(retryResponse, config.path);
    }
  }

  return parseResponse<T>(response, config.path);
}
