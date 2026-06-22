import { authClient } from "../tradaz-ui/app/lib/authClient";

const baseURL = process.env.BASE_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions extends RequestInit {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: BodyInit;
  params?: Record<string, string | number>;
}

async function apiFetch<T>(
  endpoint: string,
  { method = "GET", params = {}, body, headers = {} }: FetchOptions = {},
) {
  // initialize base url and append params
  const url = new URL(baseURL + endpoint);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  // normalize headers to a Headers instance to satisfy HeadersInit typings
  const normalizedHeaders = new Headers(headers);
  if (!normalizedHeaders.has("Content-Type")) {
    normalizedHeaders.set("Content-Type", "application/json");
  }

  return authClient.$fetch<T>(url.toString(), {
    method,
    credentials: "include",
    headers: normalizedHeaders,
    body,
  });
}

export class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (params?: Record<string, string | number>) => {
    return apiFetch<T>(this.endpoint, { params });
  };

  get = (id: number | string) => {
    return apiFetch<T>(`${this.endpoint}/${id}`);
  };

  post = (body: BodyInit, params?: Record<string, string | number>) => {
    return apiFetch<T>(this.endpoint, { method: "POST", body, params });
  };

  update = (id: number | string, body: BodyInit) => {
    return apiFetch<T>(`${this.endpoint}/${id}`, {
      method: "PUT",
      body,
    });
  };

  delete = (id: number | string) => {
    return apiFetch<void>(`${this.endpoint}/${id}`, {
      method: "DELETE",
    });
  };
}
