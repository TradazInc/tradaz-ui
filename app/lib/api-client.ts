
// Fallback to empty string allows for relative paths if hosting Next.js and the API together
const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions extends Omit<RequestInit, 'body'> {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: unknown; // Changed to unknown to accept plain objects/arrays
 params?: Record<string, string | number | boolean | undefined | null>;
}

export async function apiFetch<T>(
  endpoint: string,
  { method = "GET", params = {}, body, headers = {} }: FetchOptions = {},
): Promise<T> {
  // Ensure base URL and endpoint combine without double slashes or broken paths
  const cleanBase = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  // Initialize URL safely (supports both absolute URLs and relative paths)
  const url = cleanBase.startsWith("http")
    ? new URL(`${cleanBase}${cleanEndpoint}`)
    : new URL(`${cleanBase}${cleanEndpoint}`, typeof window !== "undefined" ? window.location.origin : undefined);

  // Append query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  // Handle automatic JSON body serialization
  let serializedBody: BodyInit | null = null;
  const clientHeaders: Record<string, string> = { ...headers as Record<string, string> };

  if (body) {
    if (body instanceof FormData || body instanceof Blob || body instanceof URLSearchParams) {
      serializedBody = body;
    } else {
      clientHeaders["Content-Type"] = "application/json";
      serializedBody = JSON.stringify(body);
    }
  }

  // Get auth token if stored locally (Optional: Adapt based on your token management system)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      clientHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url.toString(), {
    method,
    headers: clientHeaders,
    body: serializedBody,
  });

  // Handle empty or 204 No Content responses safely
  if (response.status === 204) {
    return {} as T;
  }

  if (!response.ok) {
    // Attempt to extract backend error messages before throwing
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error ${response.status}`);
  }

  return response.json();
}

// B = Body type, T = Response data type
export class ApiClient<T, B = unknown> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (params?: Record<string, string | number | boolean>): Promise<T[]> => {
    return apiFetch<T[]>(this.endpoint, { params });
  };

  get = (id: number | string): Promise<T> => {
    return apiFetch<T>(`${this.endpoint}/${id}`);
  };

  post = (body: B, params?: Record<string, string | number | boolean>): Promise<T> => {
    return apiFetch<T>(this.endpoint, { method: "POST", body, params });
  };

  update = (id: number | string, body: Partial<B>): Promise<T> => {
    return apiFetch<T>(`${this.endpoint}/${id}`, {
      method: "PUT",
      body,
    });
  };

  delete = (id: number | string): Promise<void> => {
    return apiFetch<void>(`${this.endpoint}/${id}`, {
      method: "DELETE",
    });
  };
}