const baseURL = "http://127.0.0.1:8000/api/v1";

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
): Promise<T> {
  // initialize base url and append params
  const url = new URL(baseURL + endpoint);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  // set options and fetch data
  const response = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body,
  });

  // return response or throw error
  if (!response.ok) throw new Error(`API error ${response.status}`);
  return response.json();
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
