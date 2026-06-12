import type { ApiErrorResponse, ApiSuccessResponse } from "./auth-types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly details?: ApiErrorResponse["details"],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_URL}${path}`;

  const res = await fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  const json = (await res.json()) as ApiSuccessResponse<T> | ApiErrorResponse;

  if (!res.ok || !json.success) {
    const message =
      !json.success ? json.message : `Request failed (${res.status})`;
    const details = !json.success ? json.details : undefined;
    throw new ApiError(message, details);
  }

  return json.data;
}

export { API_URL };
