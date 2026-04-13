export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function extractErrorMessage(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  if (!("message" in payload)) {
    return null;
  }

  const message = payload.message;

  if (typeof message === "string" && message.trim().length > 0) {
    return message;
  }

  if (Array.isArray(message)) {
    const normalized = message
      .filter((entry) => typeof entry === "string")
      .join(", ")
      .trim();

    return normalized.length > 0 ? normalized : null;
  }

  return null;
}

export function toApiError(
  status: number,
  payload: unknown,
  fallbackMessage: string,
): ApiError {
  return new ApiError(
    extractErrorMessage(payload) ?? fallbackMessage,
    status,
    payload,
  );
}
